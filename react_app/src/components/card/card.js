import { Link } from 'react-router-dom'
import './card.scss'
import PropTypes from 'prop-types';
import { linkShape } from '../../utils/shapes/link-shape';
import missingImage1 from '../../images/missing-picture--recipe--01.jpg';
import missingImage2 from '../../images/missing-picture--recipe--02.jpg';
import missingImage3 from '../../images/missing-picture--recipe--03.jpg';

function Card (props) {
    
    function getMissingImage() {
        const images = [
            missingImage1,
            missingImage2,
            missingImage3,
        ];
        const num = Math.floor(Math.random() * 3);
        return images[num];
    }

    return (
        <div className="card" role="article">
            <div className="card__upper">
                <img className={"card__image " + (props.image ? '' : 'card__image--missing')} src={props.image ? props.image : getMissingImage()} alt={props.title}/>
                {props.taxonomies && props.taxonomies.length !== 0 && (
                    <div className="card__taxonomies">
                        {props.taxonomies.map((term, key) => {
                            return (
                                <span className="card__term" key={key}>
                                    <Link to={term.to}>{term.title}</Link>
                                    <span className="separator">,&nbsp;</span>
                                </span>
                            )
                        })}
                    </div>
                )}
            </div>
            <div className="card__title">
                <Link to={props.to}>{props.title.length > 40 ? props.title.substring(0, 40) + '...' : props.title}</Link>
            </div>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    to: PropTypes.string.isRequired,
    taxonomies: PropTypes.arrayOf(PropTypes.shape(linkShape))
};
  
Card.defaultProps = {
};

export default Card; 