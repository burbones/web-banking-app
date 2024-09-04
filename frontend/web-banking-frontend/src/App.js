import './App.css';
import Footing from './components/Footing';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Outlet />
        <Footing />
    </div>
  );
}

export default App;
