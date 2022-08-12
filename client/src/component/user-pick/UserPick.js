import React, { useEffect, useState } from 'react';
import axios from 'axios';
import domain from '../../util/domain';
import $ from 'jquery';

import './UserPick.scss';

const UserPick = ({ user, item }) => {
	const [picks, setPicks] = useState([]);
	const [error, setError] = useState(null);
	const [expertPick, setExpertPick] = useState([]);

	async function getGames() {
		if (user) {
			try {
				const gameRes = await axios.get(`${domain}/schedule`);
				setPicks(gameRes.data.events);
			} catch (error) {
				setError(error.message);
			}
		}
	}

	useEffect(() => {
		getGames();
		let picksArr = [];
		picksArr.push(item.picks);
		let sortedPicks = [];
		const pickSequence = (picksArr) => {
			return picksArr.map((item) => {
				let picksSorted = Object.keys(item).sort(function (a, b) {
					return item[a].seq - item[b].seq;
				});
				picksSorted.map((item) => {
					return sortedPicks.push(picksArr[0][item]);
				});
				setExpertPick(sortedPicks);
			});
		};
		pickSequence(picksArr);
	}, []);

	let count = 0;

	return (
		<div className='user'>
			{error && <p>{error}</p>}
			<h2>{item.username}</h2>
			<div className='picks'>
				{expertPick.map((pick) => {
					if (pick.result === 'win') count++;
					return (
						<img
							src={`../mlb-icons/${pick.team_id}.svg`}
							className={
								pick.result === 'win'
									? 'winner-logo'
									: pick.result === 'loss'
									? 'loser-logo'
									: 'logo'
							}
							alt='logo'
						/>
					);
				})}
			</div>
			<div className='score'>
				<p>{count}</p>
			</div>
		</div>
	);
};

export default UserPick;
