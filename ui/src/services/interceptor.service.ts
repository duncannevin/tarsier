import {Vue} from 'vue-property-decorator'
import {InterceptorServiceImpl} from '@/services/interceptor.service.impl'
import {AxiosRequestConfig, AxiosResponse} from 'axios'
import {injectable} from 'inversify-props'

@injectable()
export class InterceptorService implements InterceptorServiceImpl {
  private requestMethods: Array<() => void> = []
  private responseMethods: Array<() => void> = []
  private errorMethods: Array<() => void> = []

  public pushRequestMethod(method: () => any) {
    this.requestMethods.push(method)
  }

  public pushResponseMethod(method: () => any) {
    this.responseMethods.push(method)
  }

  public pushErrorMethod(method: () => any) {
    this.errorMethods.push(method)
  }

  public initializeInterceptors() {
    this.requestInterceptor()
    this.responseInterceptor()
  }

  private requestInterceptor() {
    Vue.axios.interceptors.request.use((config: AxiosRequestConfig) => {
      this.requestMethods.forEach((method) => method())
      return config
    })
  }

  private responseInterceptor() {
    Vue.axios.interceptors.response.use((res: AxiosResponse) => {
      this.responseMethods.forEach((method) => method())
      return res
    }, (err) => {
      this.errorMethods.forEach((method) => method())
      return Promise.reject(err)
    })
  }
}
