import TodoInput from '@/components/todo-input'
import TodoList from '@/components/todo-list'

function App() {
  return (
    <main className='h-full mt-16 max-w-3xl mx-auto p-4 flex flex-col gap-4 overflow-y-auto'>
      <TodoInput />
      <TodoList />
    </main>
  )
}

export default App
