import { FormEvent } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useStore } from '@/store'

const TodoInput = () => {
  const { todos, setTodos, todoValue, setTodoValue } = useStore()

  const uuid = () => {
    return Math.random().toString(36).substring(2, 15)
  }

  return (
    <header className='fixed top-0 left-0 right-0 z-10 p-4 w-full bg-background'>
      <div className='max-w-3xl mx-auto flex sm:flex-row flex-col sm:items-center justify-between gap-4'>
        <h1 className='text-2xl font-bold text-center sm:text-left sm:text-3xl'>
          To<span className='text-primary'>Done</span>
        </h1>
        <form
          className='flex gap-2 flex-1'
          onSubmit={(e: FormEvent) => {
            e.preventDefault()
            setTodos([...todos, { id: uuid(), text: todoValue, done: false }])
            setTodoValue('')
          }}
        >
          <label htmlFor='todo-input' className='sr-only'>
            What needs to be done today?
          </label>
          <Input
            placeholder='What needs to be done?'
            id='todo-input'
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
            autoComplete='off'
          />
          <Button
            type='submit'
            className='btn btn-primary'
            disabled={!todoValue}
          >
            Add
          </Button>
        </form>
      </div>
    </header>
  )
}

export default TodoInput
