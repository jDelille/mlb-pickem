import React, { useEffect, useState } from 'react';
import UserPicks from './UserPicks';

import axios from 'axios';
import domain from '../../util/domain';
import Picks from '../../component/picks/Picks';
import Gamebar from '../../component/gamebar/Gamebar';
import Popup from '../../component/popup/Popup';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import UserPick from '../../component/user-pick/UserPick';
import { AiFillCloseCircle } from 'react-icons/ai';

import './Pool.scss';

const Pool = ({ sortedGames, setLogin }) => {
	const [poolData, setPoolData] = useState([]);
	const [expertPicks, setExpertPicks] = useState([]);
	const [togglePopup, setTogglePopup] = useState(false);
	const [closeMessage, setCloseMessage] = useState(false);

	const { user } = useContext(UserContext);

	async function getAllPicks() {
		let data = await axios.get(`${domain}/pool/`);
		setPoolData(data.data);
	}

	useEffect(() => {
		fetch(`${domain}/expert-picks`)
			.then((res) => res.json())
			.then((data) => {
				setExpertPicks(data.picks);
			});
		getAllPicks();
	}, []);

	let gameCount = 0;
	for (let i = 0; i < sortedGames.length; i++) {
		if (sortedGames[i].status.type.description === 'Scheduled') {
			gameCount++;
		}
	}

	// error message cookie
	const setCookie = (cookieKey, cookieValue, expirationDays) => {
		let expiryDate = '';

		if (expirationDays) {
			const date = new Date();

			date.setTime(
				`${date.getTime()}${expirationDays || 30 * 24 * 60 * 60 * 1000}`
			);
			expiryDate = `; expiryDate=" ${date.toUTCString()}`;
		}
		document.cookie = `${cookieKey}=${cookieValue || ''}${expiryDate}; path=/`;
	};

	const getCookie = (cookieKey) => {
		let cookieName = `${cookieKey}=`;
		let cookieArray = document.cookie.split(';');

		for (let cookie of cookieArray) {
			while (cookie.charAt(0) == ' ') {
				cookie = cookie.substring(1, cookie.length);
			}

			if (cookie.indexOf(cookieName) == 0) {
				return cookie.substring(cookieName.length, cookie.length);
			}
		}
	};

	let hideMessage = getCookie('hide_message');

	console.log(hideMessage);

	return (
		<div className='pool-page'>
			<Gamebar sortedGames={sortedGames} />
			<div className='pool-content'>
				<div className='pool-header'>
					<h1> Today's Picks </h1>
					<div className='legend'>
						<div className='legend-box '>
							<span className='box win'></span>
							<p> Win </p>
						</div>
						<div className='legend-box '>
							<span className='box lose'></span>
							<p> Loss </p>
						</div>
						<div className='legend-box '>
							<span className='box none'></span>
							<p> No pick </p>
						</div>
					</div>
					{gameCount === 0 && !closeMessage && !hideMessage && (
						<div className='missed-pick'>
							<p>You have missed the pick deadline today.</p>
							<span>
								<AiFillCloseCircle
									className='icon'
									onClick={() => {
										setCloseMessage(true);
										setCookie('hide_message', true, 1);
									}}
								/>
							</span>
						</div>
					)}
				</div>
				<div className='content'>
					<div className='users'>
						{poolData.length === 0 && gameCount > 0 && user && (
							<div className='mobile-no-picks'>
								<p> You haven't made any picks yet!</p>
								<button className='btn' onClick={() => setTogglePopup(true)}>
									Add Picks
								</button>
							</div>
						)}

						{poolData.length === 0 && gameCount > 0 && !user && (
							<div className='mobile-no-picks'>
								<p> You must be signed in to make picks.</p>
							</div>
						)}

						{togglePopup && (
							<Popup
								setTogglePopup={setTogglePopup}
								sortedGames={sortedGames}
								gameCount={gameCount}
							/>
						)}

						{poolData &&
							poolData.map((item, index) => {
								return (
									<UserPicks
										item={item}
										key={index}
										sortedGames={sortedGames}
									/>
								);
							})}

						{expertPicks.map((item, i) => {
							if (i < 16) return <UserPick item={item} key={i} />;
						})}
					</div>
					<Picks
						sortedGames={sortedGames}
						gameCount={gameCount}
						setLogin={setLogin}
					/>
				</div>
			</div>
		</div>
	);
};

export default Pool;
