import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import './MainContainer.scss';
import PropTypes from 'prop-types';
import Question from '../Question/Question';
import AnswersList from '../AnswersList/AnswersList';
import Description from '../Description/Description';
import Button from '../Button/Button';
import { birdsData } from '../../data';
import { randomInteger, getDataById } from './MainContainer.utils';

const MainContainer = ({ 
        cbSetNextLevel, 
        level, 
        isRightAnswer, 
        cbSetIsRightAnswer,
        cbSetScore,
}) => {
    const [selectedItem, setSelectedItem] = useState();
    const [question, setQuestionData] = useState();
    const [tryValue, setTryValue] = useState(0);
    const [shouldStopPlayer, setShouldStopPlayer] = useState(false);
    const activeData = birdsData[level - 1] || birdsData[0]
    const questionData = activeData[randomInteger(0, 5)];

    useEffect(() => {
        setQuestionData(questionData);
        setTryValue(0);
        setSelectedItem();
        setShouldStopPlayer(false);
    }, [level]);

    useEffect(() => {
        if (isRightAnswer) {
            const scoreValue = 6 - tryValue;
            cbSetScore(scoreValue);
        }
    }, [tryValue, isRightAnswer]);  

    const cbGetIsRightAnswer = (id) => {
        const selected = getDataById(id, activeData);
        setSelectedItem(selected[0]);
        if (isRightAnswer) return;
        setTryValue(tryValue + 1);
        const isRight = id === question.id;
        cbSetIsRightAnswer(isRight);        
    }
    const sbStopPlayer = () => {
        setShouldStopPlayer(true);
    }
    const rightId = question?.id;

    return (
        <main className={clsx('main__container')}>
            <Question data={question} isRightAnswer={isRightAnswer} shouldStopPlayer={shouldStopPlayer}/>
            <AnswersList 
                data={activeData} 
                cbGetIsRightAnswer={cbGetIsRightAnswer} 
                isRightAnswer={isRightAnswer} 
                rightId={rightId}
                sbStopPlayer={sbStopPlayer}
            />
            <Description data={selectedItem} shouldStopPlayer={shouldStopPlayer}/>
            <Button value="Next Level" className='btn-success next-level' cbSetNextLevel={cbSetNextLevel} disabled={!isRightAnswer}/>
        </main>
    )
}

MainContainer.propTypes = {
    cbSetNextLevel: PropTypes.func,
    cbSetIsRightAnswer: PropTypes.func,
    cbSetScore: PropTypes.func,
    level: PropTypes.number,
    isRightAnswer: PropTypes.bool,
}

MainContainer.defaultProps = {
    cbSetNextLevel: () => null,
    cbSetIsRightAnswer: () => null,
    cbSetScore: () => null,
    level: 1,
    isRightAnswer: false,
};

export default MainContainer;