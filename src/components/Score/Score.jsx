import React from 'react';
import './Score.scss'
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Score = ({ scoreValue }) => {
    return (
        <div className={clsx('score__container')}>
            <h5>Score: 
                <span> {scoreValue}</span>
            </h5>          
        </div>
    )
}

Score.propTypes = {
    scoreValue: PropTypes.number,
}

Score.defaultProps = {
    scoreValue: 0,
};

export default Score;