export const BASE_SCHEMA = `
import { HttpStatus } from '@nestjs/common';

export class ApiResponseSchema {
  static get(type: HttpStatus) {
    return {
      schema: {
        properties: {
          statusCode: { type: 'number', example: type },
          message: { items: { type: 'string' } },
          error: { type: 'string' },
        },
      },
    };
  }
}
`;
