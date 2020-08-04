import React from 'react';
import clsx from 'clsx';
import './Question.scss';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import Title from '../Title/Title';
import Player from '../Player/Player';

const Question = ({ data, isRightAnswer, shouldStopPlayer }) => {
    const { audio, name, image } = data;
    return (
        <div className={clsx('question__container')}>
            <Image imageLink={isRightAnswer ? image : undefined}/>
            <Title title={isRightAnswer ? name : undefined}/>
            <Player audioLink={audio} shouldStopPlayer={shouldStopPlayer}/>
        </div>
    )
}

Question.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        audio: PropTypes.string,
        image: PropTypes.string,
      }),
    isRightAnswer: PropTypes.bool,
    shouldStopPlayer: PropTypes.bool,
}

Question.defaultProps = {
    data: {},
    isRightAnswer: false,
    shouldStopPlayer: false,
};

export default Question;