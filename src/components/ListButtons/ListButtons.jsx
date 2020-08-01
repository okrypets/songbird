import React, {  } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './ListButtons.scss'

const ListButtons = ({ data, additionlCLassName, level }) => {

    return (
        <div className={clsx('nav__container', additionlCLassName)}>
            {data.map(it => {
                const setActiveClass = it.id === level ? 'active' : '';
                return <div className={clsx('nav_item', setActiveClass)} key={it.id}><Button disabled value={it.name} className={clsx('btn-success', setActiveClass)}/></div>
            })}
        </div>
    )
}

ListButtons.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })),
    additionlCLassName: PropTypes.string,
    level: PropTypes.number.isRequired
}

ListButtons.defaultProps = {
    data: [],
    additionlCLassName: '',
};

export default ListButtons;