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
		<div className='top-game-component'>
			<div className='predictions'>
				{!showMore &&
					topGame.map((game, index) => {
						if (index < 2) return <Predictions game={game} />;
					})}

				{showMore &&
					topGame.map((game, index) => {
						return <Predictions game={game} />;
					})}

				{showMore && (
					<div className='show-more' onClick={() => setShowMore(!showMore)}>
						Show Less
					</div>
				)}

				{!showMore && (
					<div className='show-more' onClick={() => setShowMore(!showMore)}>
						Show All Games
					</div>
				)}
			</div>
		</div>
	);
};

export default TopGame;
