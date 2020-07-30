import React from 'react';
import clsx from 'clsx';

import Image from '../Image/Image';
import Title from '../Title/Title';
import Player from '../Player/Player';

const Description = () => {
    return (
        <div className={clsx('description__container')}>
            <Image />
            <Title />
            <Player />
            <div className="text-description">Text</div>
        </div>
    )
}

export default Description;