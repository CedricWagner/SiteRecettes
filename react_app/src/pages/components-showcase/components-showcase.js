import './components-showcase.scss';

export default function ComponentsShowcase () {

    return (
        <div class="container">
            <h1>Couleurs</h1>
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
        </div>
    );
}