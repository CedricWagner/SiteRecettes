import React from 'react';
import './home.scss';
import NavCardsContainer from '../../blocks/nav-cards-container/nav-cards-container';
import SearchBar from '../../components/search-bar/search-bar';

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
        <h1>Recettes de saison</h1>
        
      </div>
    </div>
  )
};

export default Home;
