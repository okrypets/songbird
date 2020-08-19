import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import './MainContainer.scss';
import PropTypes from 'prop-types';
import API from '../../API';
import Question from '../Question/Question';
import AnswersList from '../AnswersList/AnswersList';
import Description from '../Description/Description';
import Button from '../Button/Button';
import { randomInteger, getDataById, getUniqueDataArra } from './MainContainer.utils';
import Congratulations from '../Congratulations/Congratulations';
import DATA from '../../data';
import loadingIcon from '../../assets/images/puff.svg';

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

    const getLevelCat = DATA.levelNavigationData.find(it => it.id === level)?.cat;  

    useEffect(() => {
        let cleanupFunction = false;        
        if (level <= 6) {
            setLoading(true); 
            API.xeno.get(`/recordings?query=${getLevelCat}+q:A+type:song`)
            .then(res => {
                console.log(res.data.recordings)
                const activeDataRes = getUniqueDataArra(res.data.recordings);
                const activeDataToSet = activeDataRes.slice(0, 6);                                 
                const questionData = activeDataRes[randomInteger(0, 5)];
                if (cleanupFunction) {
                    setActiveData(activeDataToSet);
                    setQuestionData(questionData);
                }                
            })
            .catch((err) => {                
                setError(true);
                throw new Error(err);
            })
            .finally(()=> {
                setLoading(false);
            });
        }       
        cleanupFunction = true
        return () => cleanupFunction;     
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
        <span className='ERROR'>ERROR</span>      
    )

    if (loading) return (
        <div className="loading__container">
        <span className='loading'>LOADING ...</span>
        <img src={loadingIcon} alt=""/>   
        </div>     
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