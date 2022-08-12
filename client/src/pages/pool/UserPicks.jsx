// imports
import React from 'react';

function UserPicks({ item, sortedGames }) {

	const { username } = item;

	let winnerArray = []
	let loserArray = []

	sortedGames.map(winner => {
		if (winner.competitions[0].competitors[0].winner) {
			return winnerArray.push(winner.competitions[0].competitors[0].team.abbreviation)
		}
		if (winner.competitions[0].competitors[1].winner) {
			return winnerArray.push(winner.competitions[0].competitors[1].team.abbreviation)
		}
	})

	sortedGames.map(loser => {
		if (loser.competitions[0].competitors[0].winner === false) {
			return loserArray.push(loser.competitions[0].competitors[0].team.abbreviation)
		}
		if (loser.competitions[0].competitors[1].winner === false) {
			return loserArray.push(loser.competitions[0].competitors[1].team.abbreviation)
		}
	})

	console.log(loserArray)

	let count = 0;

	return (
		<div className='user current-user-picks'>
			<h2>{username}</h2>
			<div className='picks'>
				{item.picks.map((picks, index) => {
					if (winnerArray.includes(picks)) count++;
					return (
						picks === 'no-pick' ? (
							<p className='no-pick-logo'>-</p>
						) : (
							<img src={`../mlb-icons/${picks}.svg`} alt='' className={winnerArray.includes(picks) ? 'winner-logo' : loserArray.includes(picks) ? 'loser-logo' : 'logo'} />
						)
					);
				})}
			</div>
			<div className="score">
				<p>{count}</p>

			</div>
		</div>
	);
}

export default UserPicks;
