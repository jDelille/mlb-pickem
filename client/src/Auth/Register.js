// imports
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../misc/ErrorMessage';
import UserContext from '../context/UserContext';
import domain from '../util/domain';

// styles
import './AuthForm.scss';
import './AuthPages.scss';

function Register({ setRegister, setLogin, forceOpen }) {
	const [formEmail, setFormEmail] = useState('');
	const [formPassword, setFormPassword] = useState('');
	const [formPasswordConfirm, setFormPasswordConfirm] = useState('');
	const [formUsername, setFormUsername] = useState('');
	const [formFavTeam, setFormFavTeam] = useState('');

	const [errorMessage, setErrorMessage] = useState(null);

	const { getUser } = useContext(UserContext);

	async function register(e) {
		e.preventDefault();

		const registerData = {
			email: formEmail,
			password: formPassword,
			passwordConfirm: formPasswordConfirm,
			username: formUsername,
			favoriteTeam: formFavTeam,
		};

		try {
			await axios.post(`${domain}/auth/`, registerData);
		} catch (err) {
			if (err.response) {
				if (err.response.data.errorMessage) {
					setErrorMessage(err.response.data.errorMessage);
				}
			}
			return;
		}

		await getUser();
	}

	return (
		<div className='register-page'>
			<div className='register-overlay'></div>
			<div className='auth-form-register'>
				<p
					className={forceOpen ? 'hide' : 'close-modal'}
					onClick={() => setRegister(false)}>
					&#10006;
				</p>
				<h2> Register </h2>
				<p> Create a free account to start making your picks.</p>

				{errorMessage && (
					<ErrorMessage
						message={errorMessage}
						clear={() => setErrorMessage(null)}
					/>
				)}
				<form className='form' onSubmit={register}>
					<div className='form-inputs'>
						{/* <label htmlFor='form-email'>Email</label> */}
						<input
							type='email'
							id='form-email'
							onChange={(e) => setFormEmail(e.target.value)}
							placeholder='Email'
						/>
						{/* <label htmlFor='form-username'>Username</label> */}
						<input
							type='text'
							id='form-username'
							onChange={(e) => setFormUsername(e.target.value)}
							placeholder='Username'
						/>
						{/* <label htmlFor='form-password'>Password</label> */}
						<input
							type='password'
							id='form-password'
							onChange={(e) => setFormPassword(e.target.value)}
							placeholder='Password'
						/>
						{/* <label htmlFor='form-password-confirm'>Confirm Password</label> */}
						<input
							type='password'
							id='form-password-confirm'
							onChange={(e) => setFormPasswordConfirm(e.target.value)}
							placeholder='Confirm password'
						/>
					</div>
					<button className='submit-btn' type='submit'>
						Create account
					</button>
				</form>
				<p className='register-link'>
					Already have an account?
					<span
						onClick={() => {
							setLogin(true);
							setRegister(false);
						}}>
						Login
					</span>
				</p>
			</div>
		</div>
	);
}

export default Register;
