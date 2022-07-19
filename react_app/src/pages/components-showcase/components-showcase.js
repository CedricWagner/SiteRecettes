import './components-showcase.scss';
import Card from '../../components/card/card'
import picture from '../../images/showcase-picture.webp'
import SearchBar from '../../components/search-bar/search-bar';

export default function ComponentsShowcase () {

    const cardTaxonomies = [{title: "Desserts", to: "/edze"}, {title: "Sucrés", to: "/edzdze"}]

    function onSearch(value) {
        alert("Valeur recherchée : " + value);
    }

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
                        image={picture} 
                        title="Lorem ipsum dolor sit Amet" 
                        taxonomies={cardTaxonomies}
                        to="/sf35es4f3"
                        />
                </div>
                <div className="col-md-8">
                    <SearchBar onSearch={onSearch}/>
                </div>
            </div>
        </div>
    );
}