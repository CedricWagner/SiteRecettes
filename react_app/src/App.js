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
import GoToTopButton from './components/go-to-top-button/go-to-top-button';
import Recipes from './pages/recipes/recipes';
import Recipe from './pages/recipe/recipe';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Logo/>
        <Menu/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/components" element={<ComponentsShowcase/>}/>
            <Route path="/categories" element={<Recipes/>}/>
            <Route path="/recette/:recipeSlug" element={<Recipe/>}/>
        </Routes>
        <GoToTopButton />
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
