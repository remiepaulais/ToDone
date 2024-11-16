import { Edit, Trash } from 'lucide-react'
import { Button } from './ui/button'
import { useStore } from '@/store'
import { useEffect, useRef, useState } from 'react'

const TodoCard = ({ text, index }: { text: string; index: number }) => {
  const [editMode, setEditMode] = useState(false)
  const { todos, setTodos } = useStore()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDeleteTodo = (index: number) => {
    setTodos(
      todos.filter((_, todoIndex) => {
        return todoIndex !== index
      })
    )
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(
      todos.map((todo, todoIndex) => {
        if (todoIndex === index) {
          return e.target.value
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
    <li className='flex gap-4 rounded-lg p-4 bg-card'>
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
          variant='outline'
          onClick={() => setEditMode(!editMode)}
        >
          <Edit />
        </Button>
        <Button
          size='icon'
          variant='destructive'
          onClick={() => handleDeleteTodo(index)}
        >
          <Trash />
        </Button>
      </div>
    </li>
  )
}

export default TodoCard
