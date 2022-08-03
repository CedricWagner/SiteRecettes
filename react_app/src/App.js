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
import Footer from './blocks/footer/footer';

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
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
