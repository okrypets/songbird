import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({ 
    value, 
    className, 
    cbSetNextLevel,
    cbSetIndicate, 
    disabled
}) => {  
    const handleClick = () => {        
        cbSetNextLevel();
        cbSetIndicate();       
    }

    return (        
        <button 
        type="button" 
        aria-label={value} 
        className={clsx('btn', className)} 
        onClick={handleClick} 
        disabled={disabled}
        >
            {value}
        </button>          
    )
}

Button.propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    cbSetNextLevel: PropTypes.func,
    cbSetIndicate: PropTypes.func,
    disabled: PropTypes.bool,
}

Button.defaultProps = {
    value: "",
    className: '',
    cbSetNextLevel: () => null,
    cbSetIndicate: () => null,
    disabled: false,
};

export default Button;