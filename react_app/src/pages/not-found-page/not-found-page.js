import React from 'react';
import './not-found-page.scss';
import notFoundImage from '../../images/404visual.gif';
import iconDodo from '../../images/icon-dodo.svg';
import {Link} from 'react-router-dom';  

const NotFoundPage = () => (
  	<div className="not-found-page">
		<div className="container not-found-page__container">
			<img className="not-found-page__image" src={notFoundImage} alt='Visuel "Page introuvable"' />
			<h1 className="not-found-page__title">
				Erreur 404 - Dodo introuvable
			</h1>
			<Link to="/" className="not-found-page__button">
				Retourner à l'accueil du site 
				<img src={iconDodo} className="not-found-page__button-image" alt="Icône Dodo" />
			</Link>
		</div>
	</div>
);

export default NotFoundPage;
