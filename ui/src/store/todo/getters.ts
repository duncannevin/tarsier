import {GetterTree} from 'vuex'
import {Todo, TodoState} from '@/store/todo/types'
import {RootState} from '@/store/types'

export const getters: GetterTree<TodoState, RootState> = {
  getTodos(state): Todo[] {
    return state.todos
  },
  getTodo(state, index: number): Todo {
    return state.todos[index]
  }
}
