import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Title = ({ title, additionalTitle }) => {
    return (
        <div className={clsx('title__container')}>
            <h2>{title}</h2>
            { additionalTitle && <span className='additional-title'>{additionalTitle}</span> }
        </div>
    )
}


Title.propTypes = {
    title: PropTypes.string,
    additionalTitle: PropTypes.string,
}

Title.defaultProps = {
    title: "*****",
    additionalTitle: '',
};

export default Title;