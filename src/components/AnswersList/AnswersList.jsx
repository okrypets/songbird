import React, { 
    // useState, 
    // useEffect
 } from 'react';
import clsx from 'clsx';
import './AnswersList.scss'
import PropTypes from 'prop-types';
// import ListButtons from '../ListButtons/ListButtons';
// import Button from '../Button/Button'
import AnswerItem from './AnswerItem';

const AnswersList = ({ data, cbGetIsRightAnswer, isRightAnswer, rightId }) => {
    console.log(rightId);
    // const [indicate, setQuestionData] = useState();
    
    // const cbSetIndicate = (id) => {
    //     if (id === rightId) setQuestionData('right')
    //     else setQuestionData('false')
    //     console.log(id)
    // }
    // useEffect(() => {
    //     return indicate;
    // }, [indicate])
    return (
        <div className={clsx('answer-list__container', 'btn-group-vertical')} role="group">
            {
            data.map(it => {
                return(
                    <AnswerItem 
                    item={it}
                    // cbSetIndicate={cbSetIndicate}
                    rightId={rightId}
                    cbGetIsRightAnswer={cbGetIsRightAnswer}
                    isRightAnswer={isRightAnswer}
                    />
                    // <div className={clsx('answer-list_item')} key={it.id}>
                    //     <span className={clsx('list_item_indicator', indicate)} key={it.id}/>
                    //     <Button 
                    //     value={it.name} 
                    //     className='btn-block rounded-0' 
                    //     id={it.id} 
                    //     cbGetIsRightAnswer={!isRightAnswer ? cbGetIsRightAnswer : () => null}
                    //     cbSetIndicate={cbSetIndicate}
                    //     />
                    // </div>
                )
            })
            }
        </div>
    )
}

AnswersList.propTypes = {
    cbGetIsRightAnswer: PropTypes.func,
    isRightAnswer: PropTypes.bool,
    rightId: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })),
}

AnswersList.defaultProps = {
    data: [],
    rightId: null,
    cbGetIsRightAnswer: () => null,
    isRightAnswer: false,
};

export default AnswersList;