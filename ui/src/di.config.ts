import {container} from 'inversify-props'
import {InterceptorServiceImpl} from '@/services/interceptor.service.impl'
import {InterceptorService} from '@/services/interceptor.service'
import {LocaleServiceImpl} from '@/services/locale.service.impl'
import {LocaleService} from '@/services/locale.service'

class DiConfig {
  public initialize() {
    this.register()
  }

  private register() {
    container.addSingleton<InterceptorServiceImpl>(InterceptorService)
    container.addSingleton<LocaleServiceImpl>(LocaleService)
  }
}

export default new DiConfig()
