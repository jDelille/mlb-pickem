import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Register from '../../Auth/Register';
import Login from '../../Auth/Login';
import { BiMenuAltLeft } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.scss';
import DropdownNav from './DropdownNav';
import Settings from './settings/Settings';

const Navbar = ({
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

	const [dropdown, setDropdown] = useState(false);
	const [userSettings, setUserSettings] = useState(false);

	return (
		<nav className='navbar secondary'>
			<div className='nav-content'>
				<div className='logo'>
					<Link to='/'>
						<img src='../assets/logo.svg' alt='logo' />
					</Link>
				</div>
				<ul className='links'>
					<li>
						<NavLink to='/'>Home</NavLink>
					</li>
					<li>
						<NavLink to='/pool'>Pool</NavLink>
					</li>
				</ul>
				{!user && (
					<div className='desktop-auth'>
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
					</div>
				)}

				<div
					className='pill third'
					onClick={() => {
						setToggle(!toggle);
						setTheme(!theme);
					}}>
					<div className={toggle ? 'toggle-switch' : 'toggle-switch-off'}></div>
				</div>
				{user && (
					<div className='user-settings'>
						<FaUserCircle
							className='user-icon'
							onClick={() => setUserSettings(!userSettings)}
						/>
						{userSettings && <Settings logOut={logOut} />}
					</div>
				)}
				<div className='burger'>
					<BiMenuAltLeft onClick={() => setDropdown(!dropdown)} />
				</div>
				<DropdownNav
					setDropdown={setDropdown}
					dropdown={dropdown}
					toggle={toggle}
					setToggle={setToggle}
					setRegister={setRegister}
					setLogin={setLogin}
					setTheme={setTheme}
					theme={theme}
				/>
			</div>

			{register && !user && (
				<Register setRegister={setRegister} setLogin={setLogin} />
			)}
			{login && !user && (
				<Login setLogin={setLogin} setRegister={setRegister} />
			)}
		</nav>
	);
};

export default Navbar;
