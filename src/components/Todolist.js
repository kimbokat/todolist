import React from "react";
import { AgGridReact } from 'ag-grid-react';
import { useState } from "react";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Todolist() {
  const [todo, setTodo] = useState({ desc: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);


  
    const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, todo]);
    };
  
    const inputChanged = (event) => {
      setTodo({ ...todo, [event.target.name]: event.target.value });
    };
  
    const [columnDefs] = useState([
      {field: 'desc', sortable: true, filter: true},
      {field: 'priority', sortable: true, filter: true,
        cellStyle: params => params.value === ("High", "high") ? {color: 'red'} : {color: 'black'}
    },
      {field: 'date', sortable: true, filter: true}
    ])

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <input
          type="date"
          name="date"
          value={todo.date}
          onChange={inputChanged}
        />
        <input
          placeholder="description"
          type="text"
          name="desc"
          value={todo.desc}
          onChange={inputChanged}
        />
         <input
         placeholder="priority"
          type="text"
          name="priority"
          value={todo.priority}
          onChange={inputChanged}
        />
        <input type="submit" value="Add" />
        <div className='ag-theme-material' style={{height: 500, width: 600, margin: 'auto'}}>
        <AgGridReact
               rowData={todos}
               columnDefs={columnDefs}>
           </AgGridReact>
        </div>
      </form>
    {/*<Todotable todos={todos} setTodos={setTodos} />*/}
    </div>
  );
}
