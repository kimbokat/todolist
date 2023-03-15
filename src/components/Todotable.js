import { format, parseISO } from 'date-fns';

export default function Todotable(props) {
return(
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
            
            </tr>
          ))}
        </tbody>
      </table>
      </div>
)
}