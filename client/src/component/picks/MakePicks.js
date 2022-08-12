import React, { useState } from 'react';
import $ from 'jquery';
import PickBox from './PickBox';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

const MakePicks = ({
	addPicks,
	pick,
	setPick,
	sortedGames,
	setSelected,
	availableGames,
	selected,
	setLogin,
}) => {
	const [locked, setLocked] = useState(true);
	const [count, setCount] = useState(0);
	const [popUp, setPopUp] = useState(false);
	const { user } = useContext(UserContext);

	function increment() {
		setCount(1);
	}

	// if a pick (radio button) is checked (yellow background) add to setPick array
	function handleSubmit() {
		let radios = document.querySelectorAll('#radio');
		for (let i = 0; i < radios.length; i++) {
			if (radios[i].checked) {
				setPick((prevState) => [...prevState, radios[i].value]);
			}
		}
	}

	// set background color for selected teams.
	$(document).ready(function () {
		$('input:radio').change(function () {
			var $this = $(this);
			$this.closest('.game').find('label.highlight').removeClass('highlight');
			$this.closest('.box').addClass('highlight');
			var numItems = $('.highlight').length;
			setSelected(numItems);
		});
	});

	return (
		<div>
			<div className='games-container'>
				{sortedGames.map((item, index) => {
					return (
						<PickBox
							increment={increment}
							data={item}
							availableGames={availableGames}
						/>
					);
				})}
				{/* Choose picks button  */}
				<div className='btn-container'>
					{count > 0 && selected >= availableGames && user && (
						<button
							onClick={() => {
								handleSubmit();
								setLocked(false);
								setPopUp(true);
							}}
							className='add-btn btn'>
							Add Picks
						</button>
					)}
					{count > 0 && selected >= availableGames && !user && (
						<button
							onClick={() => {
								setLogin(true);
								setLocked(false);
								// setPopUp(true);
							}}
							className='add-btn btn'>
							Add Picks
						</button>
					)}
					{popUp && (
						<button
							onClick={() => {
								addPicks();
								setLocked(false);
								setPopUp(true);
							}}
							className='add-btn confirm'>
							Confirm Picks
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default MakePicks;
