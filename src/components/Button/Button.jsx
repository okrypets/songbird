import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({ value, className, cbSetNextLevel, cbGetIsRightAnswer, cbSetIndicate, disabled, id }) => {
    
    const handleClick = (idClick) => {        
        cbSetNextLevel();
        cbGetIsRightAnswer(idClick);
        cbSetIndicate(idClick);
    }

    return (        
        <button type="button" aria-label={value} className={clsx('btn', className)} onClick={() => handleClick(id)} disabled={disabled}>{value}</button>          
    )
}

Button.propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    cbSetNextLevel: PropTypes.func,
    cbSetIndicate: PropTypes.func,
    cbGetIsRightAnswer: PropTypes.func,
    disabled: PropTypes.bool,
    id: PropTypes.number,
}

Button.defaultProps = {
    value: "",
    className: '',
    cbGetIsRightAnswer: () => null,
    cbSetNextLevel: () => null,
    cbSetIndicate: () => null,
    disabled: false,
    id: null,
};

export default Button;