import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import './MainContainer.scss';
import PropTypes from 'prop-types';
import Question from '../Question/Question';
import AnswersList from '../AnswersList/AnswersList';
import Description from '../Description/Description';
import Button from '../Button/Button';
import { birdsData } from '../../data';
import { randomInteger } from './MainContainer.utils'

const MainContainer = ({ cbSetNextLevel, level, isRightAnswer, cbSetIsRightAnswer }) => {
    const [question, setQuestionData] = useState();
    const activeData = birdsData[level - 1] || birdsData[0]
    const questionData = activeData[randomInteger(0, 5)];
    useEffect(() => {
        setQuestionData(questionData)
    }, [level])
    const cbGetIsRightAnswer = (id) => {
        console.log(id);
        const isRight = id === question.id;
        if (isRight) 
        cbSetIsRightAnswer(isRight);
    }
    const rightId = question?.id;
    return (
        <main className={clsx('main__container')}>
            <Question data={question} isRightAnswer={isRightAnswer}/>
            <AnswersList data={activeData} cbGetIsRightAnswer={cbGetIsRightAnswer} isRightAnswer={isRightAnswer} rightId={rightId}/>
            <Description />
            <Button value="Next Level" className='btn-success' cbSetNextLevel={cbSetNextLevel} />
        </main>
    )
}

MainContainer.propTypes = {
    cbSetNextLevel: PropTypes.func,
    cbSetIsRightAnswer: PropTypes.func,
    level: PropTypes.number,
    isRightAnswer: PropTypes.bool,
}

MainContainer.defaultProps = {
    cbSetNextLevel: () => null,
    cbSetIsRightAnswer: () => null,
    level: 1,
    isRightAnswer: false,
};

export default MainContainer;