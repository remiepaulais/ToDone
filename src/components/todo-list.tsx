import { useStore } from '@/store'
import TodoCard from './todo-card'

const TodoList = () => {
  const { todos } = useStore()
  return (
    <ul className='flex flex-col gap-4'>
      {todos.map((item, i) => (
        <TodoCard key={i} index={i} text={item} />
      ))}
    </ul>
  )
}

export default TodoList
