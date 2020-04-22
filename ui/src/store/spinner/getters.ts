import {GetterTree} from 'vuex'
import {RootState} from '@/store/types'
import {DropzoneFile} from '@/models'
import {SpinnerState} from '@/store/spinner/types'

export const getters: GetterTree<SpinnerState, RootState> = {
  showing(state): boolean {
    return state.showing
  }
}
