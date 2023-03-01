import React from "react";
import { format, parseISO } from 'date-fns';

export default function Todolist(props) {
    const deleteTodo = (index) => {
        const taskList = [...props.todos];
        taskList.splice(index, 1);
        props.setTodos(taskList);
    };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.todos.map((todo, index) => (
            <tr key={index}>
              <td>{format(parseISO(todo.date), 'dd.MM.yyyy')}</td>
              <td>{todo.desc}</td>
              <td><button onClick={() => deleteTodo(index)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
