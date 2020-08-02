import React, { 
    // useState, 
    // useEffect
 } from 'react';
import clsx from 'clsx';
import './AnswersList.scss'
import PropTypes from 'prop-types';
import AnswerItem from './AnswerItem';

const AnswersList = ({ data, cbGetIsRightAnswer, isRightAnswer, rightId }) => {
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
                    />
                )
            })
            }
        </div>
    )
}

AnswersList.propTypes = {
    cbGetIsRightAnswer: PropTypes.func,
    isRightAnswer: PropTypes.bool,
    rightId: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })),
}

AnswersList.defaultProps = {
    data: [],
    rightId: null,
    cbGetIsRightAnswer: () => null,
    isRightAnswer: false,
};

export default AnswersList;