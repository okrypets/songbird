import React from 'react';
import clsx from 'clsx';
import './Description.scss';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import Title from '../Title/Title';
import Player from '../Player/Player';

const REGEXPLINK = /^\/\//;

const Description = ({ data, shouldStopPlayer }) => {
    const { file, en, sp, loc, rec, rmk, image } = data;    
    const audioLink = file?.replace(REGEXPLINK, "https://");
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
                <Title title={en} additionalTitle={sp}/>
                <Player audioLink={audioLink} shouldStopPlayer={shouldStopPlayer}/>
                <div className="text-description">
                Locality: {loc}.
                <br />
                Recordist: {rec}.
                <br />
                {rmk}
                </div>
            </>
            }            
        </div>
    )
}

Description.propTypes = {
    data: PropTypes.shape({
        file: PropTypes.string,
        en: PropTypes.string,
        sp: PropTypes.string,
        loc: PropTypes.string,
        rec: PropTypes.string,
        rmk: PropTypes.string,   
        image: PropTypes.string,     
      }),
    shouldStopPlayer: PropTypes.bool,
}

Description.defaultProps = {
    data: {},
    shouldStopPlayer: false,
};

export default Description;