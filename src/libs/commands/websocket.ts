import { BaseCommand } from '.';
import { WebsocketGenerator } from '../generators/websocket.gen';

export class WebsocketCommand implements BaseCommand {
  execute(): void {
    new WebsocketGenerator().generate();
  }
}
