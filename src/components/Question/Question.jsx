import React from 'react';
import clsx from 'clsx';
import './Question.scss';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import Title from '../Title/Title';
import Player from '../Player/Player';

const Question = ({ data, isRightAnswer, shouldStopPlayer }) => {
    console.log("Question - render")
    const { file, en, image } = data;
    return (
        <div className={clsx('question__container')}>
            <Image imageLink={isRightAnswer ? image : undefined}/>
            <Title title={isRightAnswer ? en : undefined}/>
            <Player audioLink={file} shouldStopPlayer={shouldStopPlayer}/>
        </div>
    )
}

Question.propTypes = {
    data: PropTypes.shape({
        file: PropTypes.string,
        en: PropTypes.string,
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