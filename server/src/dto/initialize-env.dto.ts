import {Socket} from 'socket.io'
import {IsEnum} from 'class-validator'
import {LanguageEnum} from '../enum/language.enum'

export class InitializeEnvDto {
  @IsEnum(LanguageEnum)
  language: string
  socket?: Socket
}
