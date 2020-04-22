import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import {RootState} from '@/store/types'

import {todoState} from '@/store/todo'
import {spinnerState} from '@/store/spinner'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '0.0.1'
  },
  modules: {
    todoState,
    spinnerState
  }
}

export default new Vuex.Store<RootState>(store)
