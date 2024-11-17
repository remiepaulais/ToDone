import { Edit, Trash } from 'lucide-react'
import { Button } from './ui/button'
import { useStore } from '@/store'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TodoCard = forwardRef<HTMLLIElement, { text: string; id: string }>(
  ({ text, id }, ref) => {
    const [editMode, setEditMode] = useState(false)
    const { todos, setTodos } = useStore()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDeleteTodo = (id: string) => {
      setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, text: e.target.value }
          }
          return todo
        })
      )
    }

    useEffect(() => {
      if (editMode) {
        inputRef.current?.focus()
      }
    }, [editMode])

    return (
      <motion.li
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className='flex gap-4 rounded-lg p-4 bg-card'
        ref={ref}
      >
        <div className='flex-1 flex items-center'>
          {editMode ? (
            <input
              type='text'
              value={text}
              onChange={(e) => handleOnChange(e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditMode(false)
                }
              }}
              className='text-sm font-medium text-accent-foreground outline outline-1 outline-muted bg-transparent p-2 rounded-lg contain-content'
              ref={inputRef}
            />
          ) : (
            <p className='text-sm font-medium text-muted-foreground pl-2'>
              {text}
            </p>
          )}
        </div>
        <div className='flex items-center gap-4'>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => setEditMode(!editMode)}
          >
            <Edit />
          </Button>
          <Button
            size='icon'
            variant='destructive'
            onClick={() => handleDeleteTodo(id)}
          >
            <Trash />
          </Button>
        </div>
      </motion.li>
    )
  }
)

TodoCard.displayName = 'TodoCard'

export default TodoCard
