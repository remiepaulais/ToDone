import TodoInput from '@/components/todo-input'
import TodoList from '@/components/todo-list'

function App() {
  return (
    <main className='h-screen max-w-3xl mx-auto p-4 flex flex-col gap-4'>
      <TodoInput />
      <TodoList />
    </main>
  )
}

export default App
