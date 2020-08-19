import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import './Description.scss';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import Title from '../Title/Title';
import Player from '../Player/Player';
import API from '../../API';

const Description = ({ data, shouldStopPlayer }) => {
    // const { audio, name, image, species, description } = data;
    const [image, setImage] = useState();

    const { file, en, sp, loc, rec, rmk } = data;
    useEffect(() => {  
       let cleanupFunction = false;
       if (sp) {
        API.flickr.get(`${sp}`)
        .then(res => {
            if(cleanupFunction) {
                setImage(res.data.photos.photo[0].url_m);            
            }
        })
        .catch((err) => {  
            throw new Error(err);
        })
       }       
        cleanupFunction = true
        return () => cleanupFunction;
    }, [en])

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
                <Player audioLink={file} shouldStopPlayer={shouldStopPlayer}/>
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
      }),
    shouldStopPlayer: PropTypes.bool,
}

Description.defaultProps = {
    data: {},
    shouldStopPlayer: false,
};

export default Description;