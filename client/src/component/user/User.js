import axios from 'axios';
import React, { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import domain from '../../util/domain';
import './User.scss';
const User = () => {
	const { user } = useContext(UserContext);
	const [username, setUsername] = useState('');

	async function getUser() {
		if (user) {
			const userRes = await axios.get(`${domain}/loggedIn/${user}`);
			setUsername(userRes.data.username);
		}
	}
	getUser();

	console.log(username);

	return (
		<div className='user-component'>
			<div className='header'>
				<p className='name'>Hey {username}!</p>
			</div>
			<div className='body'>
				<div className='record'>
					<span>W/L</span>
					<p>0-0</p>
				</div>
			</div>
		</div>
	);
};

export default User;
