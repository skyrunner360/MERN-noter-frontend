import './App.css';
import { Home } from './Components/Home';
import Navbar from './Components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { About } from './Components/About';
import NoteState from './Context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
     <BrowserRouter>
    <Navbar/>
    <div className="container">
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
    </Routes>
    </div>
     </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
