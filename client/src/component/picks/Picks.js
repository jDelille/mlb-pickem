import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import domain from '../../util/domain';
import MakePicks from './MakePicks';
import TopGame from '../../component/top-game/TopGame';
import './Pick.scss';
import Highlights from '../highlights/Highlights';
import User from '../user/User';

const Picks = ({ sortedGames, gameCount, setLogin }) => {
	const { user } = useContext(UserContext);
	const [picks, setPicks] = useState([]);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [selected, setSelected] = useState(0);

	// user pick
	let [pick, setPick] = useState([]);

	// ERROR MESSAGE
	const [errorMessage, setErrorMessage] = useState(null);

	// Get current user from db
	async function getUser() {
		if (user)
			try {
				const userRes = await axios.get(`${domain}/loggedIn/${user}`);
				setEmail(userRes.data.email);
				setUsername(userRes.data.username);
			} catch (err) {
				console.log(err);
			}
	}
	getUser();
	// if user is true, get their picks
	useEffect(() => {
		if (!user) setPicks([]);
		else getPicks();
	}, [user]);

	// Get current user picks from db
	async function getPicks() {
		const pickRes = await axios.get(`${domain}/picks/`);
		setPicks(pickRes.data);
	}

	// ADD PICKS TO DATABASE
	async function addPicks() {
		const picksData = {
			picks: pick,
			user: user,
			email: email,
			username: username,
		};
		try {
			axios.post(`${domain}/picks/`, picksData);
			window.location.reload();
		} catch (err) {
			if (err.response) {
				if (err.response.data.errorMessage) {
					setErrorMessage(err.response.data.errorMessage);
				}
			}
		}
	}

	// DELETE PICKS
	async function deletePicks() {
		if (window.confirm('Do you want to delete your picks?'))
			await axios.delete(`${domain}/picks/${picks[0]._id}`);
		window.location.reload();

		getPicks();
	}

	let count = 0;

	let availableGames = 0;

	for (let i = 0; i < sortedGames.length; i++) {
		if (sortedGames[i].status.type.description === 'Scheduled') {
			availableGames++;
		}
	}
	return (
		<div className='picks-component'>
			{user && <User />}
			{gameCount > 0 &&
				(!picks[0]?.picks ? (
					<div>
						<div className='picks-info third'>
							<p>
								Your picks: {selected} / {availableGames}
							</p>
						</div>
						<div className='make-picks third'>
							<MakePicks
								addPicks={addPicks}
								pick={pick}
								setPick={setPick}
								sortedGames={sortedGames}
								countClicked={count}
								setSelected={setSelected}
								availableGames={availableGames}
								selected={selected}
								setLogin={setLogin}
							/>
						</div>
					</div>
				) : (
					<div className='submitted-picks third'>
						<p>You have successfully entered your picks.</p>
						<div className='btn-container'>
							{/* <button className='btn' onClick={() => setPick([])}>
								Edit Picks
							</button> */}
							<button className='btn delete' onClick={deletePicks}>
								Delete Picks
							</button>
						</div>
					</div>
				))}

			{gameCount === 0 && user && (
				<div className='missed-picks third'>
					<p> You have missed the pick deadline today.</p>
				</div>
			)}

			<Highlights sortedGames={sortedGames} />
			<TopGame sortedGames={sortedGames} />
		</div>
	);
};

export default Picks;
