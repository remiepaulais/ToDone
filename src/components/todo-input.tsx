import { FormEvent } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useStore } from '@/store'

const TodoInput = () => {
  const { todos, setTodos, todoValue, setTodoValue } = useStore()

  return (
    <header className='flex sm:flex-row flex-col sm:items-center justify-between gap-4'>
      <h1 className='text-2xl font-bold text-center sm:text-left sm:text-3xl'>
        To<span className='text-primary'>Done</span>
      </h1>
      <form
        className='flex gap-2 flex-1'
        onSubmit={(e: FormEvent) => {
          e.preventDefault()
          setTodos([...todos, todoValue])
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
        <Button type='submit' className='btn btn-primary' disabled={!todoValue}>
          Add
        </Button>
      </form>
    </header>
  )
}

export default TodoInput
