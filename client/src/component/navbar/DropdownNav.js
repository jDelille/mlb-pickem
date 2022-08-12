import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Register from '../../Auth/Register';
import Login from '../../Auth/Login';
import './Dropdown.scss';

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

	return (
		<div className={dropdown ? 'dropdown' : 'hide-dropdown'}>
			<ul className='dropdown-links'>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
				<li>
					<NavLink to='/pool'>Pool</NavLink>
				</li>
				{!user && (
					<>
						<button
							onClick={() => setLogin(true)}
							className='auth-btn login-btn'>
							Login
						</button>
						<button
							onClick={() => setRegister(true)}
							className='auth-btn signup-btn'>
							Sign up
						</button>
					</>
				)}

				{!user ? (
					<></>
				) : (
					<button onClick={logOut} className='logout-btn'>
						Logout
					</button>
				)}
				<p className='ld-info'> Light / Dark Mode</p>
				<div
					className='pill'
					onClick={() => {
						setToggle(!toggle);
						setTheme(!theme);
					}}>
					<div className={toggle ? 'toggle-switch' : 'toggle-switch-off'}></div>
				</div>
			</ul>
		</div>
	);
};

export default DropdownNav;
