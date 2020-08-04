import React, { useState, useEffect } from 'react';

import Header from '../Header/Header';
import MainContainer from '../MainContainer/MainContainer'

const AppContainer = () => {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [isRightAnswer, setIsRightAnswer] = useState(false);
    const cbSetNextLevel = () => {        
        setLevel(level + 1);
    }
    const cbSetIsRightAnswer = (bool) => {
        setIsRightAnswer(bool);
    }
    const cbSetScore = (scoreValue) => {
        const newScore = score + scoreValue;
        setScore(newScore);
    }
    useEffect(() => {
        setIsRightAnswer(false);
    }, [level])
    
    return (
        <>
        <Header level={level} score={score}/>
        <MainContainer 
            level={level}  
            cbSetNextLevel={cbSetNextLevel} 
            isRightAnswer={isRightAnswer} 
            cbSetIsRightAnswer={cbSetIsRightAnswer} 
            cbSetScore={cbSetScore}
        />
        </>
    )
}

export default AppContainer;