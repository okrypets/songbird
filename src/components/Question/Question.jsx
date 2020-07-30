import React from 'react';
import clsx from 'clsx';

import Image from '../Image/Image';
import Title from '../Title/Title';
import Player from '../Player/Player';

const Question = () => {
    return (
        <div className={clsx('question__container')}>
            <Image />
            <Title />
            <Player />
        </div>
    )
}

export default Question;