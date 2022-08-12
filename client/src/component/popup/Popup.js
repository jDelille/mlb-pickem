import React from 'react';
import MakePicks from '../picks/MakePicks';
import Picks from '../picks/Picks';
import './Popup.scss';

const Popup = ({ setTogglePopup, sortedGames, gameCount }) => {
	return (
		<>
			<div className='overlay'></div>
			<div className='popup'>
				<div className='header'>
					<h1>Make your picks</h1>
					<button onClick={() => setTogglePopup(false)}>Close</button>
				</div>
				<div className='content'>
					<Picks sortedGames={sortedGames} gameCount={gameCount} />
				</div>
			</div>
		</>
	);
};

export default Popup;
