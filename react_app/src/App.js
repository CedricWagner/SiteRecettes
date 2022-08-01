import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ComponentsShowcase from './pages/components-showcase/components-showcase';
import Logo from './components/logo/logo';
import Menu from './blocks/menu/menu';
import Home from './pages/home/home';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Logo/>
        <Menu/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/components" element={<ComponentsShowcase/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
