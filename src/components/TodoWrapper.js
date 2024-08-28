import React ,{useState} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from "uuid";
import {Todo} from './Todo';
import { EditTodoForm } from "./EditTodoForm";

uuidv4();
export const TodoWrapper = () => {
  const [todos,setTodos]=useState([])

  const addTodo = todo => {
    setTodos([...todos,{id:uuidv4(),task:todo,completetd:false,isEditing:false
    }])
    console.log(todos)
  }


  const toggleComplete = id => {
    const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
}
  const deleteTodo = id=>{
    setTodos(todos.filter(todo=>todo.id!==id))
  }
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className='TodoWrapper'>
       <h1>Get Things Done</h1>
        <TodoForm addTodo={addTodo}/>
        
        {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
        
      
    </div>
  )
}
