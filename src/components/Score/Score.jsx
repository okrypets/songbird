import React from 'react';
// import { number } from 'prop-types';
import clsx from 'clsx';

const Score = () => {
    return (
        <div className={clsx('score__container')}>
            <h5>Score: 
                <span>{0}</span>
            </h5>          
        </div>
    )
}

// Score.propTypes = {
//     score: number
// }

// Score.defaultProps = {
//     score: 0
// };

export default Score;