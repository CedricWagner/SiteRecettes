import React from 'react';
import PropTypes from 'prop-types';
import './category-list.scss';
import { Link } from 'react-router-dom';

const LinkShape = {
  title: PropTypes.string,
  to: PropTypes.string
}

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
  categories: PropTypes.arrayOf(PropTypes.shape(LinkShape)).isRequired
};

CategoryList.defaultProps = {};

export default CategoryList;
