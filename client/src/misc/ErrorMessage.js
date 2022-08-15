import React from 'react';
import './ErrorMessage.scss';

function ErrorMessage({ message, clear }) {
	return (
		<div className='error-message'>
			<h4 className='message'>{message}</h4>
			<button onClick={clear} className='clear-btn'>
				Clear
			</button>
		</div>
	);
}

export default ErrorMessage;
