// TODO: Possibly use classnames package.
// import clsx from 'Classnames';

const Button = () => {
    const { label, onClick, isDisabled, type, size } = this.props;
		
		let className = 'btn';
		if ( size == 'large' ) className += ' btn-lg';
		if ( size == 'small' ) className += ' btn-sm';
		if ( type == 'primary' ) className += ' btn-primary';
		if ( type == 'secondary' ) className += ' btn-secondary';
		if ( type == 'danger' ) className += ' btn-danger';

    const buttonSize = size === 'large' ? 'btn-lg' : 'btn-sm';
    let buttonType;
    
    switch( type ) {
        case 'primary':
            buttonType = 'btn-primary';
            break;
        case 'secondary':
            buttonType = 'btn-secondary';
            break;
        case 'danger':
            buttonType = 'btn-danger';
            break;
    }
		
    const finalClassSting = `btn ${ buttnonType } ${ buttonSize }`
    return (
        <button 
            className={ finalClassSting } 
            onClick={ onClick } 
            disabled={ isDisabled ? 'disabled' : '' }>
            { label }
        </button>
    );

}