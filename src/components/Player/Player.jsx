import React from 'react';
import PropTypes from 'prop-types';
import './Player.scss';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = ({ audioLink }) => {
    return (
        <AudioPlayer
            autoPlay={false}
            autoPlayAfterSrcChange={false}
            src={audioLink}
            layout='horizontal-reverse'
            customControlsSection={["MAIN_CONTROLS", 'VOLUME_CONTROLS']}
            className="player__container"
        />     
    )
}


Player.propTypes = {
    audioLink: PropTypes.string
}

Player.defaultProps = {
    audioLink: ''
};

export default Player;