import React from 'react';
import clsx from 'clsx';

import Question from '../Question/Question';
import AnswersList from '../AnswersList/AnswersList';
import Description from '../Description/Description';
import Button from '../Button/Button';

const MainContainer = () => {
    return (
        <main className={clsx('main__container', 'container-fluid')}>
            <Question />
            <AnswersList />
            <Description />
            <Button value="Next Level"/>
        </main>
    )
}

export default MainContainer;