import './menu-item.scss'
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { linkShape } from '../../utils/shapes/link-shape';
 

function MenuItem(props) {
    const location = useLocation();
    const isActive = location.pathname  + location.search === props.to;

    return (
        <div className="menu-item">
            <Link className={`menu-item__link ${isActive ? 'menu-item__link--active' : ''}`} to={props.to}>
                {props.picto && 
                    <>
                        <img src={props.picto} alt={props.title} className="menu-item__picto d-none d-md-block d-lg-none" />
                        <span className="d-md-none d-lg-block">{props.title}</span>
                    </>
                }
                {!props.picto && props.title}
            </Link>
            {props.submenu && props.submenu.length > 0 && (
                <div className="menu-item__submenu">
                    {props.submenu.map((item, key) => {
                        return <MenuItem key={key} title={item.title} to={item.to} />
                    })}
                </div>
            )}
        </div>
    )
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    submenu: PropTypes.arrayOf(PropTypes.shape(linkShape)),
    picto: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ]),
};
  
MenuItem.defaultProps = {};

export default MenuItem;