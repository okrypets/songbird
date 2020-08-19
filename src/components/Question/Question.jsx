import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import './Question.scss';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import Title from '../Title/Title';
import Player from '../Player/Player';
import API from '../../API';

const Question = ({ data, isRightAnswer, shouldStopPlayer }) => {

    const [image, setImage] = useState();

    const { file, en, sp } = data;
    useEffect(() => {  
       let cleanupFunction = false;
       if (sp) {
           API.flickr.get(`${sp}`)
            .then(res => {
                if (cleanupFunction) {
                    setImage(res.data.photos.photo[0].url_m);   
                }         
            })
            .catch((err) => {  
                throw new Error(err);
            });
        }
        cleanupFunction = true
        return () => cleanupFunction; 
    }, [en, isRightAnswer])

    
    return (
        <div className={clsx('question__container')}>
            <Image imageLink={isRightAnswer ? image : undefined}/>
            <Title title={isRightAnswer ? en : undefined}/>
            <Player audioLink={file} shouldStopPlayer={shouldStopPlayer}/>
        </div>
    )
}

Question.propTypes = {
    data: PropTypes.shape({
        file: PropTypes.string,
        en: PropTypes.string,
        sp: PropTypes.string,
      }),
    isRightAnswer: PropTypes.bool,
    shouldStopPlayer: PropTypes.bool,
}

Question.defaultProps = {
    data: {},
    isRightAnswer: false,
    shouldStopPlayer: false,
};

export default Question;