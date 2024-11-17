import { useStore } from '@/store'
import TodoCard from './todo-card'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

const TodoList = () => {
  const { todos, setTodos } = useStore()
  return (
    <ul className='flex flex-col gap-4 h-full pb-20 sm:mt-16 mt-28'>
      <AnimatePresence mode='popLayout'>
        {todos.map((item) => (
          <TodoCard key={item.id} id={item.id} text={item.text} />
        ))}
        {todos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='flex flex-col items-center justify-center gap-4 text-center h-full'
          >
            <p className='text-sm font-medium text-muted-foreground'>
              You don't have any todo yet!
              <br />
              Add one by clicking on the button below.
            </p>
            <Button
              variant='secondary'
              onClick={() =>
                setTodos([
                  ...todos,
                  {
                    id: crypto.randomUUID(),
                    text: 'This is a new todo! Edit me!',
                    done: false
                  }
                ])
              }
              aria-label='Add Todo'
            >
              Add Todo
              <Plus />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </ul>
  )
}

export default TodoList
