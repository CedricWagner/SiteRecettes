import React from 'react';
import PropTypes from 'prop-types';
import './selected-filter.scss';
import pictoCross from '../../images/icons/svg/icon_cross.svg';

const SelectedFilter = ({title, id, onRemove}) => (
  <div role={"button"} className="selected-filter btn btn-terciary" onClick={() => onRemove(id)}>
    {title}
    <img className="selected-filter__cross" alt="Retirer le filtre" src={pictoCross} />
  </div>
);

SelectedFilter.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

SelectedFilter.defaultProps = {};

export default SelectedFilter;
