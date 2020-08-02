import React from 'react';
import './Header.scss'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo'
import Score from '../Score/Score';
import ListButtons from '../ListButtons/ListButtons';

import { levelNavigationData } from '../../data';

const Header = ({ level, score }) => {
    return (
        <header className={clsx('header__container')}>
            <Logo />
            <Score scoreValue={score}/>
            <ListButtons data={levelNavigationData} level={level}/>
        </header>
    )
}

Header.propTypes = {
    level: PropTypes.number,
    score: PropTypes.number.isRequired,
}

Header.defaultProps = {
    level: 1,

};

export default Header;