import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Player.scss';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = ({ audioLink, shouldStopPlayer }) => {
    const playerEl = useRef(null)
    useEffect(() => {
        if (shouldStopPlayer) {
            console.log(shouldStopPlayer);
            const audio = playerEl.current.audio.current;
            audio.pause();
            audio.currentTime = 0;
            console.log(audio);
        }        
    }, [shouldStopPlayer])
    
    return (
        <AudioPlayer
            autoPlay={false}
            autoPlayAfterSrcChange={false}
            src={audioLink}
            layout='horizontal-reverse'
            showJumpControls={false}
            customControlsSection={["MAIN_CONTROLS", 'VOLUME_CONTROLS']}
            className="player__container"
            ref={playerEl}
        />     
    )
}


Player.propTypes = {
    audioLink: PropTypes.string,
    shouldStopPlayer: PropTypes.bool,
}

Player.defaultProps = {
    audioLink: '',
    shouldStopPlayer: false,
};

export default Player;