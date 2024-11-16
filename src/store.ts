import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Store {
  todos: string[]
  todoValue: string
  setTodos: (todos: string[]) => void
  setTodoValue: (todoValue: string) => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      todos: [],
      todoValue: '',
      setTodos: (todos: string[]) => set({ todos }),
      setTodoValue: (todoValue: string) => set({ todoValue })
    }),
    {
      name: 'todo-storage'
    }
  )
)
