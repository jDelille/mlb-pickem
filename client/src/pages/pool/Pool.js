import React, { useEffect, useState } from 'react';
import User from '../../component/user-pick/UserPick';
import UserPicks from './UserPicks';

import './Pool.scss';
import axios from 'axios';
import domain from '../../util/domain';
import Picks from '../../component/picks/Picks';
import ToggleSort from '../../component/toggle-sort/ToggleSort';
import Gamebar from '../../component/gamebar/Gamebar';
import Popup from '../../component/popup/Popup';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import UserPick from '../../component/user-pick/UserPick';
import { AiFillCloseCircle } from 'react-icons/ai';

const Pool = ({ sortedGames, setLogin }) => {
	const [poolData, setPoolData] = useState([]);
	const [toggleSort, setToggleSort] = useState(false);
	const [expertPicks, setExpertPicks] = useState([]);
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
	}, []);

	useEffect(() => {
		getAllPicks();
	}, []);

	const [sort, setSort] = useState(false);
	const [togglePopup, setTogglePopup] = useState(false);

	let gameCount = 0;

	for (let i = 0; i < sortedGames.length; i++) {
		if (sortedGames[i].status.type.description === 'Scheduled') {
			gameCount++;
		}
	}

	const [closeMessage, setCloseMessage] = useState(false);

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
					{gameCount === 0 && !closeMessage && (
						<div className='missed-pick'>
							<p>You have missed the pick deadline today.</p>
							<span>
								<AiFillCloseCircle
									className='icon'
									onClick={() => setCloseMessage(true)}
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
