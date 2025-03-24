import React, { useState } from 'react';

// Form Input Component - Has inconsistent styling and lacks proper structure
const Input = ( { label, type = 'text', initialValue, onChange, placeholder } ) => {
	const [inputValue, setInputValue] = useState(initialValue);

	const handleChange = (e) => {
		setInputValue(e.target.value);
		onChange(e);
	}

	return (
		<div className="input-group">
			<label>{ label }</label>
			<input 
				type={ type }
				value={ inputValue }
				onChange={ handleChange }
				placeholder={ placeholder } />
		</div>
	);
}

export default Input;
