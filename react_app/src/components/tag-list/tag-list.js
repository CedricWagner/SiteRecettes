import React from 'react';
import PropTypes from 'prop-types';
import './tag-list.scss';
import {linkShape} from '../../utils/shapes/link-shape';
import { Link } from 'react-router-dom';

const TagList = (props) => (
  <div className="tag-list">
    {props.tags.map((tag, key) => 
      <Link className="tag-list__item" to={tag.to} key={key}>
        #{tag.title}
      </Link>
    )}
  </div>
);

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape(linkShape)).isRequired
};

TagList.defaultProps = {};

export default TagList;
