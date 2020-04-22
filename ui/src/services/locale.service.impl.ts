import {RecordList} from '@/models'

export interface LocaleServiceImpl {
  getLocale: (section: string, target: string) => string
  getFaqList: () => RecordList
}
