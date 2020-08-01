import React from 'react';
import clsx from 'clsx';
import './Logo.scss'

import logo from '../../assets/images/logo.svg';

const Logo = () => {
    return (
        <>
        <div className={clsx('logo__container', 'logo')}>
            <h1>
                <img src={logo} alt="Songbird" />
            </h1>            
        </div>
        </>
    )
}

export default Logo;