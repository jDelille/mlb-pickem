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

function Login({ setLogin, setRegister, forceOpen }) {
	const [formEmail, setFormEmail] = useState('');
	const [formPassword, setFormPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const { getUser } = useContext(UserContext);

	async function login(e) {
		e.preventDefault();

		const loginData = {
			email: formEmail,
			password: formPassword,
		};

		try {
			await axios.post(`${domain}/auth/login`, loginData);
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
		<div className='login-page'>
			<div className='register-overlay'></div>

			<div className='auth-form-login third'>
				<p
					className={forceOpen ? 'hide' : 'close-modal'}
					onClick={() => setLogin(false)}>
					&#10006;
				</p>
				<h2> Member Login </h2>
				<p> Log in to start making your picks.</p>
				{errorMessage && (
					<ErrorMessage
						message={errorMessage}
						clear={() => setErrorMessage(null)}
					/>
				)}
				<form className='form' onSubmit={login}>
					<div className='form-inputs'>
						{/* <label htmlFor='form-email'>Email</label> */}
						<input
							type='email'
							id='form-email'
							onChange={(e) => setFormEmail(e.target.value)}
							placeholder='Email'
						/>
						{/* <label htmlFor='form-password'>Password</label> */}
						<input
							type='password'
							id='form-password'
							onChange={(e) => setFormPassword(e.target.value)}
							placeholder='Password'
						/>
					</div>

					<button className='submit-btn' type='submit'>
						Log in
					</button>
				</form>
				<p className='register-link'>
					Don't have an account?{' '}
					<span
						onClick={() => {
							setRegister(true);
							setLogin(false);
						}}>
						Sign up
					</span>
				</p>
			</div>
		</div>
	);
}

export default Login;
