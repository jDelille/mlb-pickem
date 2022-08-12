// imports
import React from 'react';
import { Link } from 'react-router-dom';

// styles
import './PicksPopup.scss';

function PicksPopup({ pick, setPopUp, addPicks, setPick }) {

	return (
		<>
			<div className='overlay'></div>
			<div className='popup-container'>
				<h1> Review your picks </h1>
				<div className='chosen-picks'>
					{pick.map((item, index) => {
						if (item !== 'no-pick') {
							return (
								<>
									<img
										src={`../mlb-icons/${item}.svg`}
										className='popup-logo'
										alt=''
										key={index}
									/>
									{/* <p>{item}</p> */}
								</>
							);
						}
					})}
				</div>
				<div className='btn-container-popup'>
					<button
						className='edit-btn'
						onClick={() => {
							setPopUp(false);
							setPick([]);
						}}>
						Edit
					</button>
					<Link className='save-btn' onClick={addPicks} to='/pool'>
						Save Picks
					</Link>
				</div>
			</div>
		</>
	);
}

export default PicksPopup;
