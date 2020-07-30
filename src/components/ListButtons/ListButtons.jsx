import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const ListButtons = ({ data }) => {
    return (
        <div className={clsx('nav__container', 'container-fluid')}>
            {data.map(it => <Button item={it.name} key={it.id}/>)}
        </div>
    )
}

ListButtons.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      }),)
}

ListButtons.defaultProps = {
    data: []
};

export default ListButtons;