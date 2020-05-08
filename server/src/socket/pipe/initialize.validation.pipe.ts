import {ArgumentMetadata, ValidationPipe} from '@nestjs/common'
import {WsException} from '@nestjs/websockets'

export class InitializeValidationPipe extends ValidationPipe {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      return await super.transform(value, metadata)
    } catch (e) {
      throw new WsException(e.message)
    }
  }
}
