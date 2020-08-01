import React, { useState, useEffect } from 'react';

import Header from '../Header/Header';
import MainContainer from '../MainContainer/MainContainer'

const AppContainer = () => {
    const [level, setLevel] = useState(1);
    const [isRightAnswer, setIsRightAnswer] = useState(false);
    const cbSetNextLevel = () => {        
        setLevel(level + 1);
    }
    const cbSetIsRightAnswer = (bool) => {
        console.log(bool);        
        setIsRightAnswer(bool);
    }
    useEffect(() => {
        setIsRightAnswer(false);
    }, [level])
    
    return (
        <>
        <Header level={level} />
        <MainContainer level={level}  cbSetNextLevel={cbSetNextLevel} isRightAnswer={isRightAnswer} cbSetIsRightAnswer={cbSetIsRightAnswer}/>
        </>
    )
}

export default AppContainer;