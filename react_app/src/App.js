import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ComponentsShowcase from './pages/components-showcase/components-showcase';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        {/* <NavBar/> */}
        <Routes>
            <Route path="/" element={<ComponentsShowcase/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
