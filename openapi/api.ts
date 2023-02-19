import { CreateTodoDto, TodoSerializer, UpdateTodoDto } from './components';
import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults } from 'axios';

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
  { params = {}, body = undefined }: RequestOptions<Req>
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

export function init(config: CreateAxiosDefaults) {
  const api = axios.create(config);

  const setBearerToken = (token: string) => {
    api.defaults.headers.common.Authorization = 'Bearer ' + token;
    return api;
  };

  class Fetch {
    static async AppController_healthCheck(options: RequestOptions<null>) {
      return await makeRequest<null, undefined>(api, 'get', '/api', options);
    }

    static async TodoController_getStats(options: RequestOptions<null>) {
      return await makeRequest<null, undefined>(
        api,
        'get',
        '/api/v1.0/todos/stats',
        options
      );
    }

    static async TodoCrudController_findAll(options: RequestOptions<null>) {
      return await makeRequest<null, TodoSerializer[]>(
        api,
        'get',
        '/api/v1.0/todos',
        options
      );
    }

    static async TodoCrudController_findOne(options: RequestOptions<null>) {
      return await makeRequest<null, TodoSerializer>(
        api,
        'get',
        '/api/v1.0/todos/' + options.params?.id + '',
        options
      );
    }

    static async TodoCrudController_create(
      options: RequestOptions<CreateTodoDto>
    ) {
      return await makeRequest<CreateTodoDto, TodoSerializer>(
        api,
        'post',
        '/api/v1.0/todos',
        options
      );
    }

    static async TodoCrudController_createMany(
      options: RequestOptions<CreateTodoDto[]>
    ) {
      return await makeRequest<CreateTodoDto[], null>(
        api,
        'post',
        '/api/v1.0/todos/many',
        options
      );
    }

    static async TodoCrudController_update(
      options: RequestOptions<UpdateTodoDto>
    ) {
      return await makeRequest<UpdateTodoDto, TodoSerializer>(
        api,
        'patch',
        '/api/v1.0/todos/' + options.params?.id + '',
        options
      );
    }

    static async TodoCrudController_removeMany(options: RequestOptions<null>) {
      return await makeRequest<null, null>(
        api,
        'delete',
        '/api/v1.0/todos/many',
        options
      );
    }

    static async TodoCrudController_remove(options: RequestOptions<null>) {
      return await makeRequest<null, null>(
        api,
        'delete',
        '/api/v1.0/todos/' + options.params?.id + '',
        options
      );
    }

    static async TodoCrudController_removeForce(options: RequestOptions<null>) {
      return await makeRequest<null, null>(
        api,
        'delete',
        '/api/v1.0/todos/' + options.params?.id + '/force',
        options
      );
    }

    static async TodoCrudController_removeForceMany(
      options: RequestOptions<null>
    ) {
      return await makeRequest<null, null>(
        api,
        'delete',
        '/api/v1.0/todos/many/force',
        options
      );
    }
  }

  return { instance: api, setBearerToken, Fetch };
}
