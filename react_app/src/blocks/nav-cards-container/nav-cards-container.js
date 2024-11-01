import React, { useEffect, useState } from 'react';
import './nav-cards-container.scss';
import getNavCardsMenuItems from './nav-cards-container.api';
import { parseMenuLink } from '../../utils/api/helpers';
import NavCard from '../../components/nav-card/nav-card';
import MultipleLoader from '../../components/multiple-loader/multiple-loader';

const NavCardsContainer = () => {
  
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    getNavCardsMenuItems().then((items) => 
    setCards(items
            .filter(item => item.enabled)
            .map((item) => {
              return {
                  title: item.title,
                  to: parseMenuLink(item.link),
                  image: item.field_image.image_style_uri.nav_card
              }
            }
        ))
    );
}, [])

  return (
    <div className="nav-cards-container row">
      {cards.length === 0 && 
        <>
          <MultipleLoader count={2}/>
          <MultipleLoader count={2}/>
        </>
      }
      {cards && cards.map((card, key) => 
        <div className="col-md-6 col-12" key={key}>
          <NavCard title={card.title} to={card.to} image={card.image} />
        </div>
      )}
    </div>
  )
};

export default NavCardsContainer;
