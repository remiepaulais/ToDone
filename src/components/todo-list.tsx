import { useStore } from '@/store'
import TodoCard from './todo-card'
import { AnimatePresence } from 'framer-motion'

const TodoList = () => {
  const { todos } = useStore()
  return (
    <ul className='flex flex-col gap-4'>
      <AnimatePresence mode='popLayout'>
        {todos.map((item) => (
          <TodoCard key={item.id} id={item.id} text={item.text} />
        ))}
      </AnimatePresence>
    </ul>
  )
}

export default TodoList
