import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import defaultImage from '../../assets/images/bird.jpg'

const Image = ({ imageLink }) => {
    return (
        <div className={clsx('image__container')}>
            <img src={imageLink} alt="" />
        </div>
    )
}


Image.propTypes = {
    imageLink: PropTypes.string
}

Image.defaultProps = {
    imageLink: defaultImage
};

export default Image;