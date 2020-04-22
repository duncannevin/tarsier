import {MutationTree} from 'vuex'
import {EditTodoValue, Todo, TodoState} from '@/store/todo/types'

export const mutations: MutationTree<TodoState> = {
  addTodo(state, todo: Todo) {
    state.todos.push(todo)
  },
  removeTodo(state, index: number) {
    state.todos.splice(index, 1)
  },
  editTodoTitle(state, {index, value}: EditTodoValue) {
    state.todos[index].title = value as string
  },
  editTodoDescription(state, {index, value}: EditTodoValue) {
    state.todos[index].description = value as string
  },
  setTodoInProgress(state, {index, value}: EditTodoValue) {
    state.todos[index].inProgress = value as boolean
  },
  setTodoDone(state, {index, value}: EditTodoValue) {
    state.todos[index].done = value as boolean
  }
}
