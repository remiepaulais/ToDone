import { Check, Edit, Trash, X } from 'lucide-react'
import { Button } from './ui/button'
import { useStore } from '@/store'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'

const TodoCard = forwardRef<HTMLLIElement, { text: string; id: string }>(
  ({ text, id }, ref) => {
    const [editMode, setEditMode] = useState(false)
    const [editText, setEditText] = useState(text)
    const { todos, setTodos } = useStore()
    const inputRef = useRef<HTMLInputElement>(null)

    const todo = todos.find((t) => t.id === id)
    const isDone = todo?.done || false

    const handleDeleteTodo = (id: string) => {
      setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditText(e.target.value)
    }

    const handleToggleDone = () => {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, done: !isDone }
          }
          return todo
        })
      )
    }

    const handleSave = () => {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, text: editText }
          }
          return todo
        })
      )
      setEditMode(false)
    }

    const handleCancel = () => {
      setEditText(text)
      setEditMode(false)
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
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className='flex gap-4 rounded-lg p-4 bg-card'
        ref={ref}
      >
        <div className='flex-1 flex items-center'>
          {!editMode && (
            <Checkbox
              className='h-4 w-4 rounded-md border-border'
              checked={isDone}
              onCheckedChange={handleToggleDone}
              aria-label='Mark Todo as Done'
            />
          )}
          {editMode ? (
            <Input
              type='text'
              value={editText}
              onChange={handleOnChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave()
                } else if (e.key === 'Escape') {
                  handleCancel()
                }
              }}
              className='flex-1 text-sm font-medium text-accent-foreground outline outline-1 outline-muted bg-transparent p-2 rounded-lg contain-content'
              ref={inputRef}
            />
          ) : (
            <p
              className={cn(
                'flex-1 text-sm font-medium pl-2',
                isDone ? 'line-through text-muted-foreground' : ''
              )}
            >
              {text}
            </p>
          )}
        </div>
        <div className='flex items-center gap-4'>
          {editMode ? (
            <>
              <Button
                size='icon'
                variant='ghost'
                onClick={handleSave}
                aria-label='Save Edit'
              >
                <Check />
              </Button>
              <Button
                size='icon'
                variant='destructive'
                onClick={handleCancel}
                aria-label='Cancel Edit'
              >
                <X />
              </Button>
            </>
          ) : (
            <>
              {!isDone && (
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => {
                    setEditText(text)
                    setEditMode(true)
                  }}
                  aria-label='Edit Todo'
                  disabled={isDone}
                >
                  {' '}
                  <Edit />
                </Button>
              )}
              <Button
                size='icon'
                variant='destructive'
                onClick={() => handleDeleteTodo(id)}
                aria-label='Delete Todo'
              >
                <Trash />
              </Button>
            </>
          )}
        </div>
      </motion.li>
    )
  }
)

TodoCard.displayName = 'TodoCard'

export default TodoCard
