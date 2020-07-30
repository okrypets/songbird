import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({ value }) => {
    return (
        <div className={clsx('nav_item')}>
            <button type="button" aria-label={value} className={clsx('btn', 'btn-success')}>{value}</button>          
        </div>
    )
}

Button.propTypes = {
    value: PropTypes.string
}

Button.defaultProps = {
    value: ""
};

export default Button;