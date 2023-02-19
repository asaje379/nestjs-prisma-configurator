import { ApiParser } from '..';
import { unCapitalize } from '../../../../utils';

export type ApiMethodType = 'get' | 'post' | 'put' | 'patch' | 'delete';
export interface ApiMethodsOptions {
  name: string;
  params: Record<string, string>;
  query: Record<string, string>;
  body: string | null;
  response: Record<string, string> | null;
}

export type ApiMethods = {
  [k in ApiMethodType]: Record<string, ApiMethodsOptions>;
};

export class ApiPathsParser extends ApiParser<string> {
  parse(paths: Record<string, any>): string {
    const methods: ApiMethods = {
      get: {},
      post: {},
      put: {},
      patch: {},
      delete: {},
    };

    for (const path in paths) {
      const data = paths[path];
      for (const method in data) {
        const $method = method as ApiMethodType;
        const item = data[$method];
        const params = item.parameters.reduce((acc: any, cur: any) => {
          if (cur.in === 'path') {
            acc[cur.name] = cur.schema.type;
          }
          return acc;
        }, {});

        const query = item.parameters.reduce((acc: any, cur: any) => {
          if (cur.in === 'query') {
            acc[cur.name] = cur.schema.type;
          }
          return acc;
        }, {});

        let name = item.operationId;
        name = unCapitalize(
          (name as string).replace(/(crud|controller)/gim, ''),
        );

        methods[$method][path] = {
          params,
          query,
          body:
            'requestBody' in item ? this.getPayload(item.requestBody) : null,
          response: this.getResponses(item),
          name,
        };
      }
    }

    return JSON.stringify(methods, null, 2);
  }

  getPayload(data: any) {
    if (data.content) {
      const schema = data.content['application/json'].schema;
      if (schema.$ref) {
        return schema.$ref.split('/schemas/')[1];
      }

      if (schema.items && schema.items.$ref) {
        return schema.items.$ref.split('/schemas/')[1] + '[]';
      }

      return null;
    }
  }

  getResponses(data: any) {
    if (data.responses) {
      const result: Record<string, string> = {};
      for (const key in data.responses) {
        result[key] = this.getPayload(data.responses[key]);
      }
      return result;
    }
    return null;
  }

  generateFetchOne(
    method: ApiMethodType,
    url: string,
    data: ApiMethodsOptions,
  ) {
    const responseType = data.response ? Object.values(data.response)[0] : null;
    let url_ = url;
    if (data.params) {
      const params = this.extractParams(url);
      for (const param of params) {
        url_ = url_.replace(`{${param}}`, `'+ options.params?.${param} +'`);
      }
    }
    return `
static async ${data.name}(options: RequestOptions<${data.body}>) {
  return await makeRequest<${
    data.body
  }, ${responseType}>(api, '${method}',  '${url_}${
      url_.endsWith(' ') ? '' : "'"
    }, options);
}`;
  }

  generateFetch(methods: ApiMethods) {
    const result = [];
    for (const method in methods) {
      const $method = method as ApiMethodType;
      for (const url in methods[$method]) {
        result.push(this.generateFetchOne($method, url, methods[$method][url]));
      }
    }
    return result.join('\n');
  }

  generateApi(methods: ApiMethods, types: string[]) {
    return `
import {${types.join(',')}} from './components'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export type ApiRequestType = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type CustomAxiosInstance = {
  instance: AxiosInstance;
  setBearerToken: (token: string) => AxiosInstance;
};
export type RequestOptions<T> = {
  params?: Record<string, string | number>;
  query?: Record<string, string | number>;
  body?: T;
};

export async function makeRequest<Req, Res>(
  api: AxiosInstance,
  method: ApiRequestType,
  url: string,
  { params = {}, body = undefined }: RequestOptions<Req>,
) {
  if (['get', 'delete'].includes(method)) {
    try {
      const response = await api[method](url, { params });
      return { isSuccess: true, data: response.data as Res };
    } catch (error: any) {
      const errorData = (error.response as AxiosError).response?.data as {
        message: string[];
      };
      return { isSuccess: false, message: errorData.message.join(';') };
    }
  }
  try {
    const response = await api[method](url, body ?? {}, { params });
    return { isSuccess: true, data: response.data as Res };
  } catch (error: any) {
    const errorData = (error.response as AxiosError).response?.data as {
      message: string[];
    };
    return { isSuccess: false, message: errorData.message.join(';') };
  }
}

export function init(config: AxiosRequestConfig) {
  const api = axios.create(config);

  const setBearerToken = (token: string) => {
    api.defaults.headers.common.Authorization = 'Bearer ' + token;
    return api;
  };

  class Fetch {
    ${this.generateFetch(methods)}
  }

  return { instance: api, setBearerToken, Fetch };
}
`;
  }

  extractParams(url: string) {
    const keyStack = [];
    for (let i = 0; i < url.length; i++) {
      if (url[i] === '{') {
        i++;
        let key = '';
        while (url[i] !== '}') {
          key += url[i];
          i++;
        }
        keyStack.push(key);
        i++;
      }
    }
    return keyStack;
  }
}
