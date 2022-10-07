import React from 'react';
import PropTypes from 'prop-types';
import './list-wrapper.scss';
import MultipleLoader from '../../components/multiple-loader/multiple-loader';
import Card from '../../components/card/card';

const ListWrapper = ({items}) => (
    <div className="row">
        {!items && 
            <MultipleLoader count={4} />
        }
        {items.length === 0 && 
            <p>Aucun résultat...</p>
        }
        {items && items.map((item, key) => 
            <div className="col-md-3 mb-4" key={key}>
                <Card title={item.title} image={item.image} to={item.to} taxonomies={item.taxonomies}/>						
            </div>
        )}
    </div>
);

ListWrapper.propTypes = {
    items: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object).isRequired,
        PropTypes.bool.isRequired
    ])
};

ListWrapper.defaultProps = {
    items: false
};

export default ListWrapper;
