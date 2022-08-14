import React, { useEffect, useState } from 'react';
import Picks from '../picks/Picks';
import { AiOutlineArrowRight, AiOutlineClose } from 'react-icons/ai';
import './Popup.scss';
import Predictions from '../top-game/Predictions';
import axios from 'axios';
import domain from '../../util/domain';

const Popup = ({ setTogglePopup, sortedGames, gameCount }) => {
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

	return (
		<>
			<div className='overlay'></div>
			<div className='popup secondary'>
				<div className='header'>
					<h1>Make your picks</h1>
					<button onClick={() => setTogglePopup(false)}>
						<AiOutlineClose />
					</button>
				</div>
				<div className='content'>
					<Picks sortedGames={sortedGames} gameCount={gameCount} />
					{/* <p className='info'>
						{' '}
						Scroll to see game predictions{' '}
						<span>
							<AiOutlineArrowRight />
						</span>
					</p>
					<div className='predictions-mobile'>
						{topGame.map((game, index) => {
							return <Predictions game={game} />;
						})}
					</div> */}
				</div>
			</div>
		</>
	);
};

export default Popup;
