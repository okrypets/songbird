import React from 'react';
import './Congratulations.scss'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '../Button/Button';
import congratulations from '../../assets/images/tenor.gif'

const Congratulations = ({ score, cbSetNextLevel }) => {
    return (
        <div className={clsx('congratulations__container')}>
            <h2>Поздравляем!</h2> 
            <h4>Вы прошли викторину и набрали {score} из 30 возможных баллов.</h4>
            { score < 30 && <Button value="Попробовать еще раз" className='btn-success next-level' cbSetNextLevel={cbSetNextLevel} />}
            { score === 30 && <img src={congratulations} width={300} alt='Congratulations'/>}
        </div>
    )
}

Congratulations.propTypes = {
    cbSetNextLevel: PropTypes.func.isRequired,
    score: PropTypes.number.isRequired,
}

Congratulations.defaultProps = {
};

export default Congratulations;