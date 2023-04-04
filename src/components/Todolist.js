import React from "react";
import dayjs from "dayjs"; //mahdollinen ratkaisu, tutki lisää
import { AgGridReact } from "ag-grid-react";
import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Todolist() {
  const [todo, setTodo] = useState({  date: null, desc: "",priority: "" });
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('one');

  const gridRef = useRef();

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
    setTodo({  date: null, desc: "", priority: "" });
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

  const handleChange = (event, value) => {
    setValue(value);
    };
    

  const [columnDefs] = useState([
    {
      field: "date",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      floatingFilter: true,
    },
    {
      field: "desc",
      sortable: true,
      suppressMenu: true,
      filter: "agTextColumnFilter",
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      floatingFilter: true,
    },
    {
      field: "priority",
      sortable: true,
      suppressMenu: true,
      filter: "agTextColumnFilter",
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      floatingFilter: true,
      cellStyle: (params) =>
        params.value === "high" || "High"
          ? { color: "red" }
          : { color: "black" },
    },
  ]);

  return (
    <div className="App">
<Tabs value={value} onChange={handleChange}>
<Tab value="one" label="Home" />
<Tab value="two" label="Todo List" />
</Tabs>
{value === 'one' && <div>Welcome to the Todo List app!</div>}
{value === 'two' && (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <DatePicker
            label="Date"
            views={["year", "month", "day"]} //to do: mahdollinen ratkaisu
            value={todo.date}
            onChange={(date) => setTodo({ ...todo, date })}
          />

          <TextField
            variant="outlined"
            label="Description"
            name="desc"
            value={todo.desc}
            onChange={inputChanged}
          />
          <TextField
            variant="outlined"
            label="Priority"
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
            animateRows={true}
          ></AgGridReact>
        </div>
      </LocalizationProvider>
)}
</div>


  );
}
