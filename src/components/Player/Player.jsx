import React from 'react';
import PropTypes from 'prop-types';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = ({ audioLink }) => {
    return (
        <AudioPlayer
            // autoPlay
            src={audioLink}
            onPlay={() => console.log("onPlay")}
            layout='horizontal-reverse'
            customControlsSection={["MAIN_CONTROLS"]}
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