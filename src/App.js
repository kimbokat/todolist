import "./App.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Todolist from "./components/Todolist";

function App() {
 
  return (
  <div className="App">

  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        My To Do List
      </Typography>
    </Toolbar>
  </AppBar>
 
 <Todolist />
  </div>
  );
 
}

export default App;
