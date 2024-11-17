import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Todo {
  id: string
  text: string
  done: boolean
}

interface Store {
  todos: Todo[]
  todoValue: string
  setTodos: (todos: Todo[]) => void
  setTodoValue: (todoValue: string) => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      todos: [],
      todoValue: '',
      setTodos: (todos: Todo[]) => set({ todos }),
      setTodoValue: (todoValue: string) => set({ todoValue })
    }),
    {
      name: 'todo-storage'
    }
  )
)
