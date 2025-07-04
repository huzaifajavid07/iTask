import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";



function App() {
  // const [count, setCount] = useState(0)
  const [todo, settodo] = useState("") // input state
  const [todos, settodos] = useState([]) // handle all add todo
  const [loaded, setLoaded] = useState(false);
  const [showfinished, setshowfinished] = useState(true)



  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
  }



  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      settodos(JSON.parse(saved));
    }
    setLoaded(true); // now initial load is done
  }, []);

  // Save to localStorage — only after loaded
  useEffect(() => {
    if (loaded) {
      console.log("Saving todos:", todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loaded]);




  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)


  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)



  }
  const handleAdd = () => {
    if (todo.trim() === "") {
      return; // 🚫 don’t add if empty or only spaces
    }
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")





  }
  const handleChange = (e) => {
    settodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)



  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex gap-2">

            <input onChange={handleChange} value={todo} type="text" className='border border-gray-300 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-violet-500 w-full rounded-full px-5 py-1' />
            <button
              disabled={todo.length <= 3}
              onClick={handleAdd}
              className={`px-4 text-white rounded-3xl 
    ${todo.length <= 3
                  ? 'bg-violet-400 cursor-not-allowed'
                  : 'bg-violet-600 hover:bg-violet-900 hover:cursor-pointer'}`}>
              Save
            </button>

          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showfinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-lg font-bold'>Your Todo</h2>
        <div className="todos">
          {todos.length == 0 && <div className="text-lg font-bold text-violet-700 text-center mt-8 p-4 bg-indigo-100 rounded-lg shadow">No Todos to display</div>}
          {todos.map((item) => {
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 w-full justify-between items-center">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}
                </div >
              </div>
              <div className="button mx-2 flex h-full justify-center">


                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="p-2 bg-violet-600 text-white rounded-full hover:bg-violet-900 hover:scale-105 transition"
                  type="button"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="p-2 bg-violet-600 text-white rounded-full hover:bg-red-700 hover:scale-105 transition ml-2"
                  type="button"
                >
                  <AiFillDelete />
                </button>

              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
