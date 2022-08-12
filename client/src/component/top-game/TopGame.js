import axios from 'axios';
import React, { useEffect, useState } from 'react';
import domain from '../../util/domain';
import Predictions from './Predictions';
import './TopGame.scss';

const TopGame = () => {
	const [topGame, setTopGame] = useState([]);
	const [error, setError] = useState(null);

	async function getGames() {
		try {
			const gameRes = await axios.get(`${domain}/predictions`);
			setTopGame(gameRes.data);
		} catch (error) {
			setError(error.message);
		}
	}

	useEffect(() => {
		getGames();
	}, []);

	const [showMore, setShowMore] = useState(false);

	return (
		<div className={showMore ? 'top-game-component' : 'hide-top-game'}>
			{topGame.map((game) => {
				return <Predictions game={game} />;
			})}
			{showMore && (
				<p className='show-more' onClick={() => setShowMore(!showMore)}>
					Show Less
				</p>
			)}

			{!showMore && (
				<p className='show-more' onClick={() => setShowMore(!showMore)}>
					Show All Games
				</p>
			)}
		</div>
	);
};

export default TopGame;
