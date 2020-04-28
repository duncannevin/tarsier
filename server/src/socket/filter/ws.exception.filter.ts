import { ArgumentsHost } from '@nestjs/common';
import {BaseWsExceptionFilter, WsException} from '@nestjs/websockets'

export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();

    client.emit('exception', exception);
  }
}
