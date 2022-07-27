import './menu-item.scss'
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { linkShape } from '../../utils/shapes/link-shape';
 

function MenuItem(props) {
    const location = useLocation();
    const isActive = location.pathname === props.to

    return (
        <div className="menu-item">
            <Link className={`menu-item__link ${isActive ? 'menu-item__link--active' : ''}`} to={props.to}>
                {props.title}
            </Link>
            {props.submenu && (
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
    submenu: PropTypes.arrayOf(PropTypes.shape(linkShape))
};
  
MenuItem.defaultProps = {};

export default MenuItem;