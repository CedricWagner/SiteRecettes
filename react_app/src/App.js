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
import Recipe from './pages/recipe/recipe';
import RecipesByCategory from './pages/recipes-by-category/recipes-by-category';
import RecipesByTag from './pages/recipes-by-tag/recipes-by-tag';
import NotFoundPage from './pages/not-found-page/not-found-page';
import { Fragment } from 'react';
import ScrollToTop from './utils/hooks/ScrollToTop';
import SearchResult from './pages/search-result/search-result';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Fragment>
          <ScrollToTop />
          <Logo/>
          <Menu/>
          <div className="body">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/components" element={<ComponentsShowcase/>}/>
                <Route path="/categories" element={<RecipesByCategory/>}/>
                <Route path="/tags" element={<RecipesByTag/>}/>
                <Route path="/recette/:recipeSlug" element={<Recipe/>}/>
                <Route path="/recherche" element={<SearchResult/>}/>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <GoToTopButton />
          </div>
          <Footer/>
        </Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
