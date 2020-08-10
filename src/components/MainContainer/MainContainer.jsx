import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import './MainContainer.scss';
import PropTypes from 'prop-types';
import API from '../../API';
import Question from '../Question/Question';
import AnswersList from '../AnswersList/AnswersList';
import Description from '../Description/Description';
import Button from '../Button/Button';
import { randomInteger, getDataById } from './MainContainer.utils';
import Congratulations from '../Congratulations/Congratulations';

const MainContainer = ({ 
        cbSetNextLevel, 
        level, 
        isRightAnswer, 
        cbSetIsRightAnswer,
        cbSetScore,
        score
}) => {
    const [selectedItem, setSelectedItem] = useState();
    const [activeData, setActiveData] = useState([]);
    const [question, setQuestionData] = useState();
    const [tryValue, setTryValue] = useState(0);
    const [shouldStopPlayer, setShouldStopPlayer] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        API.get('/birdsData')
            .then(res => {
                console.log(res.data);
                const activeDataRes = res.data[level - 1] || res.data[0]
                setActiveData(activeDataRes);
                const questionData = activeDataRes[randomInteger(0, 5)];
                setQuestionData(questionData);
            })
            .catch(err => {
                setError(true)
                console.log(err.message);
            })
            .finally(()=> {
                setLoading(false);
            });
    }, [level]);

    useEffect(() => {
            setQuestionData(question);
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

    const cbGetIsRightAnswer = (id, indicate) => {
        const selected = getDataById(id, activeData);
        setSelectedItem(selected[0]);
        if (isRightAnswer || indicate) return;
        setTryValue(tryValue + 1);
        const isRight = id === question.id;
        cbSetIsRightAnswer(isRight);        
    }
    const sbStopPlayer = () => {
        setShouldStopPlayer(true);
    }
    const rightId = question?.id;
    const isCongratulations = level > 6;    

    if (error) return (
        <span className='ERROR'/>      
    )

    if (loading) return (
        <span className='LOADING'/>      
    )
    return (
        <main className={clsx('main__container', isCongratulations ? "Congratulations" : '')}>
            {isCongratulations ? 
            <Congratulations score={score} cbSetNextLevel={cbSetNextLevel}/>
            : (
            <>
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
            </>
            )}            
        </main>
    )
}

MainContainer.propTypes = {
    cbSetNextLevel: PropTypes.func,
    cbSetIsRightAnswer: PropTypes.func,
    cbSetScore: PropTypes.func,
    level: PropTypes.number,
    score: PropTypes.number.isRequired,
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