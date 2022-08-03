import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseMenuLink } from '../../utils/api/helpers';
import getFooterMenuItems from './footer.api';
import './footer.scss';

const Footer = () => {
  
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getFooterMenuItems().then((items) => 
      setMenuItems(items
        .filter(item => item.enabled)
        .map(item => {
          return {
            title: item.title,
            to: parseMenuLink(item.link),
          }
        })
      ))

  }, [])

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__menu">
          {menuItems && menuItems.map((item, key) =>
              <Link to={item.to} className="footer__menu-item footer__menu-item--link" key={key}>
                {item.title}
              </Link>
          )}
          <span className="footer__menu-item footer__menu-item--copyright">
            Les Véganeries de Dodo © 2022 - Réalisé par <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/c%C3%A9dric-wagner-573ab8129/">Cédric Wagner</a>
          </span>
        </div>
      </div>
    </div>
  )
};

export default Footer;
