import React from 'react';
import PropTypes from 'prop-types';
import './category-list.scss';
import { Link } from 'react-router-dom';
import { linkShape } from '../../utils/shapes/link-shape';



const CategoryList = (props) => (
  <div className="category-list">
    {props.categories.map((category, key) => 
      <Link className="category-list__item" key={key} to={category.to}>
        {category.title}
      </Link>
    )}
  </div>
);

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(linkShape)).isRequired
};

CategoryList.defaultProps = {};

export default CategoryList;
