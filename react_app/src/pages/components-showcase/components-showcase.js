import './components-showcase.scss';
import Card from '../../components/card/card'
import Picture from '../../images/showcase-picture.webp'
import NavPicture from '../../images/showcase-nav-picture.webp'
import SearchBar from '../../components/search-bar/search-bar';
import { Link } from 'react-router-dom';
import NavCard from '../../components/nav-card/nav-card';
import CategoryList from '../../components/category-list/category-list';
import RecipeFeature from '../../components/recipe-feature/recipe-feature';
import CookingTimeIcon from '../../images/icons/svg/icon_hourglass.svg';
import SteamIcon from '../../images/icons/svg/icon_steam.svg';
import OvenIcon from '../../images/icons/svg/icon_oven.svg';
import FlatwareIcon from '../../images/icons/svg/icon_flatware.svg';
import QuantityControl from '../../components/quantity-control/quantity-control';
import { useState } from 'react';
import IngredientLine from '../../components/ingredient-line/ingredient-line';
import IngredientPicto from '../../images/showcase-ingredient.png'

export default function ComponentsShowcase () {

    const cardTaxonomies = [{title: "Desserts", to: "/edze"}, {title: "Sucrés", to: "/edzdze"}]

    function onSearch(value) {
        alert("Valeur recherchée : " + value);
    }

    const [currentQuantity, setCurrentQuantity] = useState(12)

    function updateQuantity(newValue) { setCurrentQuantity(newValue) }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-3">
                    <div className="showcase-square showcase-square--primary"></div>
                </div>
                <div className="col-sm-3">
                    <div className="showcase-square showcase-square--secondary"></div>
                </div>
                <div className="col-sm-3">
                    <div className="showcase-square showcase-square--terciary"></div>
                </div>
                <div className="col-sm-3">
                    <div className="showcase-square showcase-square--fourth"></div>
                </div>
            </div>
            <div className="row">
                <h1 className="mt-5">Titre</h1>
                <div className="col-md-4">
                    <Card 
                        image={Picture} 
                        title="Lorem ipsum dolor sit Amet" 
                        taxonomies={cardTaxonomies}
                        to="/sf35es4f3"
                        />
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-12">
                            <SearchBar onSearch={onSearch}/>
                            <Link to="/recherche-avancee" className="btn btn-link">Recherche avancée</Link>
                        </div>
                        <div className="col-12 mt-4">
                            <NavCard to="/test" title="Recettes" image={NavPicture}/>
                        </div>
                    </div>

                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-8">
                    <CategoryList categories={[{title: "Desserts", to: '/desserts'}, {title: "Sucrés", to: '/sucres'}]} />
                    <h1 className="text-center">Titre de la recette sit amet, version sans gluten</h1>
                    <div className="row">
                        <div className="col-md-3">
                            <RecipeFeature value="25 min" items={[{title: 'Temps de cuisson', picto: CookingTimeIcon}]}/>
                        </div>
                        <div className="col-md-3">
                            <RecipeFeature items={[{title: 'Four', picto: OvenIcon}, {title: 'Vapeur', picto: SteamIcon}]}/>
                        </div>
                        <div className="col-md-3">
                            <RecipeFeature value="25 min" items={[{title: 'Temps de cuisson', picto: CookingTimeIcon}]}/>
                        </div>
                        <div className="col-md-3">
                            <RecipeFeature items={[{title: 'Nombre de parts', picto: FlatwareIcon}]}>
                                <QuantityControl current={currentQuantity} unity="pers." onUpdateQuantity={updateQuantity}/>
                            </RecipeFeature>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                </div>
                <div className="col-md-8">
                    <h2 className="mt-5">Ingrédients</h2>
                    <IngredientLine amount='50' name='Noix de coco' picto={IngredientPicto} unit="g."/>
                </div>
            </div>
        </div>
    );
}