import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Login from '../../Auth/Login';
import Register from '../../Auth/Register';
import UserContext from '../../context/UserContext';
import './Home.scss';

const Home = ({ register, login, setRegister, setLogin }) => {
	const { user } = useContext(UserContext);

	return (
		<div className='homepage one'>
			<div className='home-content'>
				<div className='text'>
					<h1> MLB DAILY PICKEM POOL </h1>
					{/* <h1> MLB </h1> */}
					<h2>Get started for free</h2>
					<div className='btn-container'>
						{!user && (
							<button className='btn' onClick={() => setRegister(true)}>
								Create an account
							</button>
						)}
						{user && (
							<NavLink to='/pool' className='btn'>
								Go to pool
							</NavLink>
						)}
					</div>
				</div>
				<div className='images'>
					<div className='bar secondary'>
						<div className='left'>
							<img src='../mlb-icons/NYM.svg' alt='' />
							<p className='name'>Mets</p>
							<p className='mobile'>NYM</p>
						</div>
						<div className='middle'>
							<h1>NYM -1.5</h1>
							<p>38% of the pool</p>
						</div>
						<div className='right'>
							<p className='name'>Dodgers</p>
							<p className='mobile'>LAD</p>
							<img src='../mlb-icons/LAD.svg' alt='' />
						</div>
					</div>
					<div className='bar bar-2 secondary'>
						<div className='left'>
							<img src='../mlb-icons/ARI.svg' alt='' />
							<p className='name'>Diamondbacks</p>
							<p className='mobile'>ARI</p>
						</div>
						<div className='middle'>
							<h1>ARI -2.5</h1>
							<p>78% of the pool</p>
						</div>
						<div className='right'>
							<p className='name'>Nationals</p>
							<p className='mobile'>WSH</p>
							<img src='../mlb-icons/WSH.svg' alt='' />
						</div>
					</div>
				</div>
			</div>

			{register && !user && (
				<Register setRegister={setRegister} setLogin={setLogin} />
			)}
			{login && !user && (
				<Login setLogin={setLogin} setRegister={setRegister} />
			)}
		</div>
	);
};

export default Home;
