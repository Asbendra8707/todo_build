import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function ToDo({ todo, setToDos }) {
  const updateToDo = async (todoId, todoStatus) => {
    const res = await fetch(`https://mern-todo-axios-backend.onrender.com/api/todo/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ status: todoStatus }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    if (data.acknowledged) {
      setToDos((currentTodos) => {
        return currentTodos.map((current) => {
          if (current._id === todoId) {
            return { ...current, status: !current.status }
          }
          else return current
        })
      })
    }
  }
  //Delete operation
  const deleteToDo = async (todoId) => {
    const res = await fetch(`https://mern-todo-axios-backend.onrender.com/api/todo/${todoId}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (data.acknowledged) {
      setToDos((currentTodos) => {
        return currentTodos.filter((current) =>
          (current._id != todoId))
      })
    }
  }


  const [Myprogress, setProgress] = useState("")
  const updateProgress = async (todoId, todoProgress) => {
    const res = await fetch(`/api/todo/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ progress: todoProgress }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    if (data.acknowledged) {
      setToDos((currentTodos) => {
        return currentTodos.map((current) => {
          if (current._id === todoId) {
            return { ...current, progress: !current.progress }
          }
          else return current
        })
      })
    }
  }

  return (
    <>
      <ListGroup className='rounded-5 mt-4 mb-1'>
        <ListGroup.Item className='d-flex justify-content-center bg-success-subtle'>
          <div>
            <input type="text" value={todo.task} disabled className=' p-1 text-black bg-white text-capitalize rounded-2'
            style={todo.progress == 100 ? { textDecorationLine: "line-through" } : { textDecoration: 'none' }}
            />

          <span className='mx-2 float-end'><Button
            className='text-black btn-sm rounded-2'
            onClick={() => updateToDo(todo._id, todo.status)} variant="outline-success"
            >
            {(todo.status) ? <input type='checkbox' defaultChecked /> : <input type='checkbox' />}Click
          </Button>
            <Button
              className='text-black btn-sm rounded-2'
              onClick={() => deleteToDo(todo._id)} variant="outline-danger">
              <RiDeleteBin6Line />
            </Button></span>
                </div>
            </ListGroup.Item>
        <ListGroup.Item className='d-flex justify-content-center bg-success-subtle' >
          <form >
            <input type='text' placeholder=' Enter progress %' value={Myprogress} onChange={(e) => setProgress(e.target.value)}
              className='rounded-2'/>
            <button className='text-black mx-2 btn-sm rounded-2 btn btn-outline-success' onClick={() => updateProgress(todo._id, Myprogress)}>Progress</button>
            <div className='m-1'>
              <ProgressBar animated now={todo.progress} label={`${todo.progress}%`} />
            </div>
          </form>
        </ListGroup.Item>
      </ListGroup>



    </>
  )
}

export default ToDo