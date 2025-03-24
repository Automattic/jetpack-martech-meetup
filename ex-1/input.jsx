import React from 'react';

// Form Input Component - Has inconsistent styling and lacks proper structure
const Input = ( props ) => {
	return (
		<div className="input-group">
			<label>{ props.label }</label>
			<input 
				type={ props.type || 'text' }
				value={ props.value }
				onChange={ props.onChange }
				placeholder={ props.placeholder } />
		</div>
	);
}

export default Input;
