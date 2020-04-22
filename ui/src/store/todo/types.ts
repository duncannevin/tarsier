export interface TodoState {
  todos: Todo[]
}

export class Todo {
  title: string = ''
  description: string = ''
  inProgress: boolean = false
  done: boolean = false
}

export interface EditTodoValue {
  index: number
  value: string | boolean
}
