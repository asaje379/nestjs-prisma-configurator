export const BASE_ERROR = `
import { HttpStatus, NotFoundException } from '@nestjs/common';

export class BaseError {
  static _404(message = 'The \`id\` you provided does not exist') {
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: [message],
      error: 'NOT FOUND',
    });
  }
}
`;
