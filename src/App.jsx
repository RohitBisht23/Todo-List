import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Context'
import { TodoForm, TodoItems } from './Components'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) =>{
    setTodos((prevTodo) => [{id: Date.now(), ...todo}, ...prevTodo])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) =>(prevTodo.id === id? todo : prevTodo)))
  }

  const deleteTodo = (id) =>{
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) =>{
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed : !prevTodo.completed} : prevTodo))
  }

  //Local storage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
  
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
  
      if (parsedTodos && parsedTodos.length > 0) {
        setTodos(parsedTodos);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className='bg-[#172842] h-screen w-screen'>
        <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
          <h1 className='text-2xl font-bold text-center mb-8 mt-2'>Manage Your Todos</h1>

          <div className='mb-4'>
            {/*Todo form goes here */}
            <TodoForm />
          </div>

          <div className='flex flex-wrap gray-y-3'>
            {/*Loop and Add todoItem here */}
            {
              todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItems todo={todo}/>
                </div>
              ))
            }
          </div>

        </div>

      </div>
    </TodoProvider>
  )
}

export default App
