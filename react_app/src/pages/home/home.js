import React from 'react';
import './home.scss';
import NavCardsContainer from '../../blocks/nav-cards-container/nav-cards-container';
import SearchBar from '../../components/search-bar/search-bar';
import CardsGroupWrapper from '../../blocks/cards-group-wrapper/cards-group-wrapper';
import SeasonalRecipes from '../../blocks/seasonal-recipes/seasonal-recipes';

const Home = () => {
  
  return (
    <div className="home">
      <div className="container">
        <NavCardsContainer />
      </div> 
      <div className="container-small mt-4 mb-4">
        <SearchBar onSearch={(value) => alert('TODO')} />
      </div>
      <div className="container">
        <CardsGroupWrapper title="Recettes de saison" link="/recettes">
          <SeasonalRecipes />
        </CardsGroupWrapper>
      </div>
    </div>
  )
};

export default Home;
