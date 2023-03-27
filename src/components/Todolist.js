import React from "react";
import { AgGridReact } from "ag-grid-react";
import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Todolist() {
  const [todo, setTodo] = useState({ desc: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);

  const gridRef = useRef();

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
    setTodo({ description: "", date: "" });
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0)
      setTodos(
        todos.filter(
          (todo, index) => gridRef.current.getSelectedNodes()[0].id != index
        )
      );
    else alert("Please select a row first");
  };

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const [columnDefs] = useState([
    { field: "desc", sortable: true, filter: true },
    {
      field: "priority",
      sortable: true,
      filter: true,
      cellStyle: (params) =>
        params.value === "high" || "High"
          ? { color: "red" }
          : { color: "black" },
    },
    { field: "date", sortable: true, filter: true },
  ]);

  return (
    <div className="App">
      
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          variant="standard"
          label="date"
          name="date"
          value={todo.date}
          onChange={inputChanged}
        />
        <TextField
          variant="standard"
          label="description"
          type="text"
          name="desc"
          value={todo.desc}
          onChange={inputChanged}
        />
        <TextField
          variant="standard"
          label="priority"
          type="text"
          name="priority"
          value={todo.priority}
          onChange={inputChanged}
        />
        <Button
          size="small"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={addTodo}
        >
          Add todo
        </Button>
        <Button
          size="small"
          startIcon={<DeleteIcon />}
          variant="contained"
          color="error"
          onClick={deleteTodo}
        >
          Delete
        </Button>
      </Stack>

      <div
        className="ag-theme-material"
        style={{ height: 500, width: 600, margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowData={todos}
          columnDefs={columnDefs}
          rowSelection="single"
        ></AgGridReact>
      </div>

      {/*<Todotable todos={todos} setTodos={setTodos} />*/}
    </div>
  );
}
