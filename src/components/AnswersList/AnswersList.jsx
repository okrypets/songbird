import React, { 
    // useState, 
    // useEffect
 } from 'react';
import clsx from 'clsx';
import './AnswersList.scss'
import PropTypes from 'prop-types';
import AnswerItem from './AnswerItem';

const AnswersList = ({ data, cbGetIsRightAnswer, isRightAnswer, rightId, sbStopPlayer }) => {
    return (
        <div className={clsx('answer-list__container', 'btn-group-vertical')} role="group">
            {
            data.map(it => {
                return(
                    <AnswerItem 
                    item={it}
                    rightId={rightId}
                    cbGetIsRightAnswer={cbGetIsRightAnswer}
                    isRightAnswer={isRightAnswer}
                    key={it.id}
                    sbStopPlayer={sbStopPlayer}
                    />
                )
            })
            }
        </div>
    )
}

AnswersList.propTypes = {
    cbGetIsRightAnswer: PropTypes.func,
    sbStopPlayer: PropTypes.func,
    isRightAnswer: PropTypes.bool,
    rightId: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
      })),
}

AnswersList.defaultProps = {
    data: [],
    rightId: null,
    cbGetIsRightAnswer: () => null,
    sbStopPlayer: () => null,
    isRightAnswer: false,
};

export default AnswersList;