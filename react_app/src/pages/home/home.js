import React from 'react';
import './home.scss';
import NavCardsContainer from '../../blocks/nav-cards-container/nav-cards-container';
import SearchBar from '../../components/search-bar/search-bar';
import CardsGroupWrapper from '../../blocks/cards-group-wrapper/cards-group-wrapper';
import SeasonalRecipes from '../../blocks/seasonal-recipes/seasonal-recipes';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  
  const navigate = useNavigate();

  function redirectToSearchPage(value) {
    navigate('/recherche?text=' + value);
  }

  return (
    <div className="home">
      <div className="container">
        <NavCardsContainer />
      </div> 
      <div className="container-small mt-5 mb-6">
        <SearchBar onSearch={redirectToSearchPage} />
      </div>
      <div className="container">
        <CardsGroupWrapper title="Recettes de saison" link="/categories">
          <SeasonalRecipes />
        </CardsGroupWrapper>
      </div>
    </div>
  )
};

export default Home;
