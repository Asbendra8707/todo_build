import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './ToDo';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


function App() {
  const [todos, setToDos] = useState([]);
  const [content, setContent] = useState('');
  useEffect(() => {
    const getToDos = async () => {
      try {
        const response = await fetch('/api/todo');
        if (!response.ok) throw new Error("Failed to fetch");
        const json = await response.json();
        setToDos(json);
        console.log(json);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    getToDos();
  }, []);

  const createToDo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/todo', {
        method: "POST",
        body: JSON.stringify({ task: content }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("Failed to create todo");
      const data = await res.json();
      setContent('');
      setToDos([...todos, data]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }
  return (
    <>
      <div className='rounded-4 border-3 border border-info mt-5' style={{ backgroundImage: 'url(background.jpeg)', backgroundSize: 'cover' }}>
        <h1 className='text-center text-black m-3'>ToDos List</h1>
          <ListGroup className='rounded-5' >
            <ListGroup.Item className='d-flex justify-content-center bg-success-subtle'><form onSubmit={createToDo} className="" style={{}} >
              <input type="text" placeholder="Enter new todo here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className='rounded-2'
              />
              <Button type="submit" className='text-black btn-sm mx-1' variant="outline-success">
                Add Task
              </Button>
            </form>
            </ListGroup.Item>
            </ListGroup>

        {todos.map((todo) => (
          <ToDo todo={todo} key={todo._id} setToDos={setToDos} />
        ))}

      </div>
    </>
  )
}

export default App