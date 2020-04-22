import {injectable} from 'inversify-props'
import locales from '../../public/locale.json'
import faqList from '../../public/faq-list.json'
import {RecordList, Locales} from '@/models'
import {LocaleServiceImpl} from '@/services/locale.service.impl'

@injectable()
export class LocaleService implements LocaleServiceImpl {
  private readonly locales: Locales = locales

  public getLocale(section: string, target: string): string {
    if (!this.locales[section] || !this.locales[section][target]) {
      return `${section}.${target}`
    }
    return this.locales[section][target]
  }

  public getFaqList(): RecordList {
    return faqList
  }
}
