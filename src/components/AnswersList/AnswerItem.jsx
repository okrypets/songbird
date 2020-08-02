import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '../Button/Button';

const AnswerItem = ({ 
    item, 
    cbGetIsRightAnswer, 
    isRightAnswer, 
    rightId,
}) => { 
    const [indicate, setIndicate] = useState();
    
    const cbSetIndicate = (id) => {
        if (isRightAnswer) return;
        if (id === rightId) setIndicate('right');
        else setIndicate('false');
    }
    useEffect(() => {
        return setIndicate();
    }, [item])
    return (        
        <div className={clsx('answer-list_item')}>
            <span className={clsx('list_item_indicator', indicate)}/>
            <Button 
                value={item.name} 
                className='btn-block rounded-0' 
                id={item.id} 
                cbGetIsRightAnswer={cbGetIsRightAnswer}
                cbSetIndicate={cbSetIndicate}
                indicate={indicate}
            />
        </div>          
    )
}

AnswerItem.propTypes = {
    item: PropTypes.shape({
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