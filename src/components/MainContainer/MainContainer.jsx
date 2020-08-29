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
    
    const [selectedItem, setSelectedItem] = useState({});
    const [activeData, setActiveData] = useState([]);
    const [question, setQuestionData] = useState({});
    const [tryValue, setTryValue] = useState(0);
    const [shouldStopPlayer, setShouldStopPlayer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasIndicate, setHasInicate] = useState([]);

    const getLevelCat = DATA.levelNavigationData.find(it => it.id === level)?.cat;  

    useEffect(() => {
        setActiveData([]);
        setQuestionData();
        let cleanupFunction = false; 
        let activeDataToSet = [];
        let questionData = {};
        if (level <= 6) {
            setLoading(true); 
            API.xeno.get(`/recordings?query=${getLevelCat}+q:A+type:song`)
            .then(res => {
                const activeDataRes = getUniqueDataArra(res.data.recordings);
                const randomStartNumber = randomInteger(0, activeDataRes.length - 6);                       
                activeDataToSet = activeDataRes.slice(randomStartNumber, randomStartNumber + 6); 
                questionData = activeDataToSet[randomInteger(0, 5)];
            })
            .then(() => {
                if (activeDataToSet.length > 0) {
                    const newActiveData = [...activeDataToSet];      
                    newActiveData.map((it, index) => {
                        let imageValue = null;
                        let newIt = it;
                        API.flickr.get(`${it.sp}`)
                        .then(res => {
                            imageValue = res.data.photos.photo[0].url_m; 
                            newIt = {...it, image: imageValue};
                            newActiveData[index] = newIt;                            
                            if (it.id === questionData.id) {
                                setQuestionData(newIt);
                            }
                            if (index === activeDataToSet.length - 1 && cleanupFunction) {                                
                                setActiveData(newActiveData);
                            }  
                            return newIt;       
                        })
                        .catch(() => {
                            setLoading(false);
                            console.log(`Не удалось загрузить картику для - ${it.sp}`);
                        })
                        return newIt;
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            })
        }
        cleanupFunction = true
        return () => cleanupFunction;     
    }, [level]);

    useEffect(() => {
            setQuestionData(question);
            setTryValue(0);
            setSelectedItem({});
            setShouldStopPlayer(false);
            setHasInicate([]);
    }, [level]);

    useEffect(() => {
        if (isRightAnswer) {
            const scoreValue = 6 - tryValue;
            cbSetScore(scoreValue);
        } 

    }, [tryValue, isRightAnswer]);

    const checkHasItemIndicate = id => {
        const isInclude = (hasIndicate || []).some(it => it === id);
        if (isInclude || isRightAnswer) return true;
        const newHasIndicate = [...hasIndicate, id];
        setHasInicate(newHasIndicate);
        return false;
    }

    const cbGetIsRightAnswer = (id) => {
        const hasItemIndicate = checkHasItemIndicate(id);
        const selected = getDataById(id, activeData);
        setSelectedItem(selected[0]);
        if (isRightAnswer) return;
        if (!hasItemIndicate) {
            const newTryValue = tryValue + 1
            setTryValue(newTryValue);
        }        
        const isRight = id === question.id;
        cbSetIsRightAnswer(isRight);        
    }

    const sbStopPlayer = () => {
        setShouldStopPlayer(true);
    }
    const rightId = question?.id;
    const isCongratulations = level > 6;    

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
                <Button value="Next Level" className='btn-success next-level' cbSetNextLevel={cbSetNextLevel} />
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

/* disabled={!isRightAnswer} */