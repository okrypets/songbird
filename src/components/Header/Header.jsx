import React from 'react';

import clsx from 'clsx';
import Logo from '../Logo/Logo'
import Score from '../Score/Score';
import ListButtons from '../ListButtons/ListButtons';

import { levelNavigationData } from '../../data';

const Header = () => {
    // const { score } = props;
    return (
        <header className={clsx('header__container', 'container-fluid')}>
            <Logo />
            <Score />
            <ListButtons data={levelNavigationData}/>
        </header>
    )
}

export default Header;