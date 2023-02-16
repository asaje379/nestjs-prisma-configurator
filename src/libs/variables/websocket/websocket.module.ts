export const websocketModule = `
import { Module } from '@nestjs/common';

@Module({
  providers: [WebsocketGateway],
  exports: [WebsocketGateway],
})
export class WebsocketModule {}
`;
