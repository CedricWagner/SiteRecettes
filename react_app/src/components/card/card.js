import { Link, useNavigate } from 'react-router-dom'
import './card.scss'
import PropTypes from 'prop-types';
import { linkShape } from '../../utils/shapes/link-shape';

function Card (props) {
    let navigate = useNavigate();

    function onCardClick () {
        navigate(props.to);
    }

    return (
        <div className="card">
            <div className="card__upper">
                <img className="card__image" src={props.image} alt={props.title} onClick={onCardClick}/>
                {props.taxonomies && (
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
            <div className="card__title" onClick={onCardClick}>
                {props.title}
            </div>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    taxonomies: PropTypes.arrayOf(PropTypes.shape(linkShape))
};
  
Card.defaultProps = {};

export default Card; 