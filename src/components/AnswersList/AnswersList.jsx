import React from 'react';
import clsx from 'clsx';

import ListButtons from '../ListButtons/ListButtons';
import { birdsData } from '../../data';

const AnswersList = () => {
    return (
        <div className={clsx('answer-list__container')}>
            <ListButtons data={birdsData[0]} />
        </div>
    )
}

export default AnswersList;