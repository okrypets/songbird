import React from 'react';
import clsx from 'clsx';
import './Description.scss';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import Title from '../Title/Title';
import Player from '../Player/Player';

const Description = ({ data }) => {
    const { audio, name, image, species, description } = data;
    const isDataEmpty = Object.keys(data).length === 0;
    return (        
        <div className={clsx('description__container')}>
            {isDataEmpty ? 
            <div>
                <h5>Послушайте плеер.</h5>
                <h5>Выберите птицу из списка.</h5>
            </div>
            : 
            <>
                <Image imageLink={image}/>
                <Title title={name} additionalTitle={species}/>
                <Player audioLink={audio}/>
                <div className="text-description">{description}</div>
            </>
            }            
        </div>
    )
}

Description.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        audio: PropTypes.string,
        image: PropTypes.string,
        species: PropTypes.string,
        description: PropTypes.string,
      }),
    // isRightAnswer: PropTypes.bool,
}

Description.defaultProps = {
    data: {},
    // isRightAnswer: false,
};

export default Description;