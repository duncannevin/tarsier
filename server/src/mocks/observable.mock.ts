import {PartialObserver, Subscribable, Unsubscribable} from 'rxjs/internal/types'

export class ObservableMock<T> implements Subscribable<T> {
  subscribe(observer?: PartialObserver<T>): Unsubscribable
  subscribe(next: null | undefined, error: null | undefined, complete: () => void): Unsubscribable
  subscribe(next: null | undefined, error: (error: any) => void, complete?: () => void): Unsubscribable
  subscribe(next: (value: T) => void, error: null | undefined, complete: () => void): Unsubscribable
  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable
  subscribe(observer?: PartialObserver<T> | null | undefined | ((value: T) => void), error?: null | undefined | ((error: any) => void), complete?: () => void): Unsubscribable {
    return undefined
  }
}
