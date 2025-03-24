import React from 'react';

// Form Input Component - Has inconsistent styling and lacks proper structure
const Input = ( { label, type, value, onChange, placeholder } ) => {
	return (
		<div className="input-group">
			<label>{ label }</label>
			<input 
				type={ type || 'text' }
				value={ value }
				onChange={ onChange }
				placeholder={ placeholder } />
		</div>
	);
}

export default Input;
