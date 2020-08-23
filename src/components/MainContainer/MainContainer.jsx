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
    console.log("MainContainer - render", tryValue, isRightAnswer)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getLevelCat = DATA.levelNavigationData.find(it => it.id === level)?.cat;  

    useEffect(() => {
        let cleanupFunction = false;        
        if (level <= 6) {
            setLoading(true); 
            API.xeno.get(`/recordings?query=${getLevelCat}+q:A+type:song`)
            .then(res => {
                console.log(res)
                console.log(res.data.recordings)
                const activeDataRes = getUniqueDataArra(res.data.recordings);
                const randomStartNumber = randomInteger(0, activeDataRes.length - 6);                       
                const activeDataToSet = activeDataRes.slice(randomStartNumber, randomStartNumber + 6); 
                const questionData = activeDataToSet[randomInteger(0, 5)];
                if (cleanupFunction) {
                    setActiveData(activeDataToSet);
                    setQuestionData(questionData);
                }                
            })
            .catch((err) => {                
                setError(true);
                setLoading(false); 
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
        let cleanupFunction = false;
        if (activeData.length > 0) {   
            const newActiveData = [...activeData];      
            newActiveData.map(async (it, index) => {
                let imageValue = null;
                let newIt = it;
                await API.flickr.get(`${it.sp}`)
                .then(res => {
                    if (cleanupFunction) {
                        imageValue = res.data.photos.photo[0].url_m; 
                        newIt = {...it, image: imageValue};
                        newActiveData[index] = newIt;
                        if (it.id === question.id) {
                            setQuestionData(newIt);
                        }
                        if (index === activeData.length - 1) {
                            setActiveData(newActiveData)
                        }                         
                    }   
                    return newIt;       
                })
                .catch((err) => {  
                    throw new Error(err);
                });
                return newIt;
            });
            console.log(newActiveData)          
        }
        cleanupFunction = true
        return () => cleanupFunction;    
    }, [loading]);

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
        const newTryValue = tryValue + 1
        setTryValue(newTryValue);
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