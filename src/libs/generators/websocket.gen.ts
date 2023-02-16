import { websocketGateway } from './../variables/websocket/websocket.gateway';
import { websocketTypings } from './../variables/websocket/websocket.typings';
import { websocketModule } from './../variables/websocket/websocket.module';
import { NestResourceGenerator } from './nest-resource.gen';

export class WebsocketGenerator extends NestResourceGenerator {
  constructor() {
    super({
      path: 'websocket',
      data: {
        module: websocketModule,
        typings: websocketTypings,
        gateway: websocketGateway,
      },
    });
  }
}
