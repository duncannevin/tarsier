import { IsEnum } from 'class-validator'
import {LanguageEnum} from '../enum/language.enum'

export class InitializeDto {
  @IsEnum(LanguageEnum)
  language: string
}
