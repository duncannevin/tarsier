import {ArgumentMetadata, ValidationPipe} from '@nestjs/common'
import {WsException} from '@nestjs/websockets'

export class WsValidationPipe extends ValidationPipe {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      return await super.transform(value, metadata)
    } catch (e) {
      return new WsException(e.message)
    }
  }
}
