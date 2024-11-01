import React from 'react';
import PropTypes from 'prop-types';
import './multiple-loader.scss';
import Loader from '../loader/loader';

const MultipleLoader = (props) => {
  
  const loaders = [];

  for (let index = 0; index < props.count; index++) {
    loaders.push(
      <div key={index} className={`multiple-loader__item text-center col-md-${12/props.count}`}>
        <Loader />
      </div>
    )
  }

  return (
    <div className="multiple-loader row">
      {loaders}
    </div>
)};

MultipleLoader.propTypes = {
  count: PropTypes.number.isRequired
};

MultipleLoader.defaultProps = {};

export default MultipleLoader;
