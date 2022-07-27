import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ComponentsShowcase from './pages/components-showcase/components-showcase';
import Logo from './components/logo/logo';
import Menu from './components/menu/menu';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Logo/>
        <Menu/>
        <Routes>
            <Route path="/" element={<ComponentsShowcase/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
