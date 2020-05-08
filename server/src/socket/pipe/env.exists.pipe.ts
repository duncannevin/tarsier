import {ArgumentMetadata, Inject, PipeTransform, ValidationPipe} from '@nestjs/common'
import {WsException} from '@nestjs/websockets'
import {EnvironmentService} from '../../environment/environment.service'
import {JoinEnvDto} from '../../dto/join-env.dto'

export class EnvExistsPipe implements PipeTransform {
  constructor(
    @Inject('EnvironmentService') private readonly environmentService: EnvironmentService
  ) {
  }

  public transform(
    joinEnvDto: JoinEnvDto,
    metadata: ArgumentMetadata
  ): any {
    switch (metadata.type) {
      case 'body':
        if (this.environmentService.environmentExists(joinEnvDto.environmentId)) {
          return joinEnvDto
        }
        throw new WsException('No such environment')
      case 'custom':
        return joinEnvDto
      case 'param':
        return joinEnvDto
      case 'query':
        return joinEnvDto
      default:
        throw new WsException('No such environment')
    }
  }
}
