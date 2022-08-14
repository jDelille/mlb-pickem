import axios from 'axios';
import React, { useContext, useState } from 'react';
import UserContext from '../../../context/UserContext';
import domain from '../../../util/domain';
import { TbLogout } from 'react-icons/tb';
import './Settings.scss';

const Settings = ({ logOut }) => {
	const { user } = useContext(UserContext);
	const [username, setUsername] = useState('');

	async function getUser() {
		if (user) {
			const userRes = await axios.get(`${domain}/loggedIn/${user}`);
			setUsername(userRes.data.username);
		}
	}
	getUser();
	return (
		<div className='settings secondary'>
			<h1>
				{' '}
				Welcome, <span>{username}</span>
			</h1>
			{/* <p>
				<TbLogout /> Sign Out
			</p>
			<p>
				<TbLogout /> Dark Mode
			</p> */}
			<p onClick={logOut}>
				<TbLogout /> Sign Out
			</p>
		</div>
	);
};

export default Settings;
