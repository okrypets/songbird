import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '../Button/Button';

const AnswerItem = ({ item, cbGetIsRightAnswer, isRightAnswer, rightId }) => { 
    const [indicate, setQuestionData] = useState();
    
    const cbSetIndicate = (id) => {
        if (isRightAnswer) return;
        if (id === rightId) setQuestionData('right')
        else setQuestionData('false')
        console.log(id)
    }
    return (        
        <div className={clsx('answer-list_item')} key={item.id}>
            <span className={clsx('list_item_indicator', indicate)}/>
            <Button 
            value={item.name} 
            className='btn-block rounded-0' 
            id={item.id} 
            cbGetIsRightAnswer={!isRightAnswer ? cbGetIsRightAnswer : () => null}
            cbSetIndicate={cbSetIndicate}
            />
        </div>          
    )
}

AnswerItem.propTypes = {
    item: PropTypes.objectOf({
        id: PropTypes.number,
        name: PropTypes.string,
        audio: PropTypes.string,
        image: PropTypes.string,
      }),
    cbGetIsRightAnswer: PropTypes.func,
    isRightAnswer: PropTypes.bool,
    rightId: PropTypes.number,
}

AnswerItem.defaultProps = {
    item: {},
    cbGetIsRightAnswer: () => null,
    isRightAnswer: false,
    rightId: null
};

export default AnswerItem;