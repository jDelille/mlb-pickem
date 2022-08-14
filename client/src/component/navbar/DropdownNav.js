import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Register from '../../Auth/Register';
import Login from '../../Auth/Login';
import { ImHome } from 'react-icons/im';
import { IoBaseballOutline } from 'react-icons/io5';
import { TbLogout, TbLogin } from 'react-icons/tb';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { FiUserPlus } from 'react-icons/fi';
import './Dropdown.scss';
import axios from 'axios';
import domain from '../../util/domain';

const DropdownNav = ({
	dropdown,
	toggle,
	setToggle,
	setRegister,
	setLogin,
	register,
	login,
	theme,
	setTheme,
}) => {
	const { user, logOut } = useContext(UserContext);
	const [username, setUsername] = useState('');

	async function getUser() {
		if (user) {
			const userRes = await axios.get(`${domain}/loggedIn/${user}`);
			setUsername(userRes.data.username);
		}
	}
	getUser();

	return (
		<div
			className={dropdown ? 'dropdown secondary' : 'hide-dropdown secondary'}>
			{user && (
				<p className='welcome'>
					Welcome, <span>{username}</span>
				</p>
			)}

			<ul className='dropdown-links'>
				<li>
					<span>
						<ImHome />
					</span>
					<NavLink to='/'>Home</NavLink>
				</li>
				<li>
					<span>
						<IoBaseballOutline />
					</span>
					<NavLink to='/pool'>Pool</NavLink>
				</li>
				<li>
					<span>
						{!toggle && <MdLightMode />}
						{toggle && <MdDarkMode />}
					</span>
					<p
						className=''
						onClick={() => {
							setToggle(!toggle);
							setTheme(!theme);
						}}>
						{' '}
						{!toggle && 'Light Mode'}
						{toggle && 'Dark Mode'}
					</p>
				</li>
				{!user && (
					<div className='mobile-auth'>
						<li>
							<span>
								<TbLogin />
							</span>
							<p onClick={() => setLogin(true)}>Login</p>
						</li>
						<li>
							<span>
								<FiUserPlus />
							</span>
							<p onClick={() => setRegister(true)}>Sign up</p>
						</li>
					</div>
				)}
				{user && (
					<li>
						<span>
							<TbLogout />
						</span>
						<p onClick={logOut}>Logout</p>
					</li>
				)}
			</ul>
		</div>
	);
};

export default DropdownNav;
