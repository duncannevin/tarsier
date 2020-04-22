import {ActionTree} from 'vuex'
import {EditTodoValue, Todo, TodoState} from '@/store/todo/types'
import {RootState} from '@/store/types'
import Vue from 'vue'

export const actions: ActionTree<TodoState, RootState> = {
  async addTodo({commit}) {
    const todo = new Todo()
    return await Vue.axios.post('/api/post-todo', todo)
      .then(() => commit('addTodo', todo))
  },
  async removeTodo({commit}, index: number) {
    return await Vue.axios.patch(`/api/deleteTodo/${index}`, {})
      .then(() => commit('removeTodo', index))
  },
  async editTodoTitle({commit}, {index, value}: EditTodoValue) {
    return await Vue.axios.patch(`/api/updateTodo/${index}`, {index, title: value})
      .then(() => commit('editTodoTitle', {index, value}))
  },
  async editTodoDescription({commit}, {index, value}: EditTodoValue) {
    return await Vue.axios.patch(`/api/updateTodo/${index}`, {index, description: value})
      .then(() => commit('editTodoDescription', {index, value}))
  },
  async setTodoInProgress({commit}, {index, value}: EditTodoValue) {
    return await Vue.axios.patch(`/api/updateTodo/${index}`, {index, inProgress: value})
      .then(() => commit('setTodoInProgress', {index, value}))
  },
  async setTodoDone({commit}, {index, value}: EditTodoValue) {
    return await Vue.axios.patch(`/api/updateTodo/${index}`, {index, done: value})
      .then(() => commit('setTodoDone', {index, value}))
  }
}
