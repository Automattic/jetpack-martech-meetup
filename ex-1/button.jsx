// TODO: Possibly use classnames package.
// import clsx from 'Classnames';
import React from 'react';
import clsx from 'clsx';

const Button = ( { label, onClick, isDisabled, type, size } ) => {
    const getButtonType = () => {
        if ( type == 'primary' ) return 'btn-primary';
        if ( type == 'secondary' ) return 'btn-secondary';
        if ( type == 'danger' ) return 'btn-danger';
    }
    const getButtonSize = () => {
        if ( size == 'large' ) return 'btn-lg';
        if ( size == 'small' ) return 'btn-sm';
    }

    const finalClassSting = clsx('btn', getButtonType(), getButtonSize());

    return (
        <button 
            className={ finalClassSting } 
            onClick={ onClick } 
            disabled={ isDisabled ? 'disabled' : '' }>
            { label }
        </button>
    );

}

export default Button;
