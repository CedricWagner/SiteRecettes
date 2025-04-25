import React, { useEffect } from 'react';
import './home.scss';
import NavCardsContainer from '../../blocks/nav-cards-container/nav-cards-container';
import SearchBar from '../../components/search-bar/search-bar';
import CardsGroupWrapper from '../../blocks/cards-group-wrapper/cards-group-wrapper';
import SeasonalRecipes from '../../blocks/seasonal-recipes/seasonal-recipes';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../../utils/hooks/usePageTitle';

const Home = () => {
  
  const navigate = useNavigate();
  const setPageTitle = usePageTitle();

  function redirectToSearchPage(value) {
    navigate('/recherche?text=' + value);
  }

  useEffect(() => {
    setPageTitle();
  })

  return (
    <div className="home">
      <div className="container">
        <NavCardsContainer />
      </div> 
      <div className="container-small mt-5 mb-6">
        <SearchBar onSearch={redirectToSearchPage} value="" />
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
