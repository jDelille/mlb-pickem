// imports
import moment from 'moment';
import React, { useEffect } from 'react';
import $ from 'jquery';

// styles
import './PickBox.scss';

const PickBox = ({ data, increment, availableGames }) => {
	// team info
	let homeTeamName = data?.competitions[0].competitors[0].team.displayName;
	let awayTeamName = data?.competitions[0].competitors[1].team.displayName;

	let homeTeamAbbr = data?.competitions[0].competitors[0].team.abbreviation;
	let awayTeamAbbr = data?.competitions[0].competitors[1].team.abbreviation;

	const { shortDetail } = data.status.type;


	return (
		<div className='game-box'>
			{data.status.type.description === 'Scheduled' && (
				<div className='game third'>
					<div className='top'>
						{/* home team */}
						<label className='box'>
							<input
								type='radio'
								name={data.id}
								id='radio'
								value={homeTeamAbbr}
								onClick={increment}
								defaultValue={'no-pick'}
								required
							/>
							<div className='logo'>
								<img
									src={`../mlb-icons/${homeTeamAbbr}.svg`}
									className='team-logo'
									alt=''
								/>
							</div>
							<p>
								{/* {data?.competitions[0]?.odds[1]?.homeTeamOdds?.winPercentage}% */}
							</p>
						</label>
						{/* gametime */}
						<div className='game-time'>
							<p className='at'> at </p>
							<p>{moment(data.competitions[0].date).format('h:mm A, MM/DD')}</p>
						</div>
						{/* away team */}
						<label className='box'>
							<input
								type='radio'
								name={data.id}
								id='radio'
								value={awayTeamAbbr}
								onClick={increment}
								defaultValue={'no-pick'}
								required
							/>
							<div className='logo'>
								<img
									src={`../mlb-icons/${awayTeamAbbr}.svg`}
									className='team-logo'
									alt=''
								/>
							</div>
							{/* <p>{data.competitions[0].odds[1].awayTeamOdds.winPercentage}%</p> */}
						</label>
					</div>
					<div className='middle'>
						<div className='box'>
							<p>{data.competitions[0].competitors[0].team.abbreviation}</p>
						</div>
						<div className='space'></div>
						<div className='box'>
							<p>{data.competitions[0].competitors[1].team.abbreviation}</p>
						</div>
					</div>
					<div className='pitchers'>
						<p>{data.name}</p>
					</div>
				</div>
			)}
			{data.status.type.description !== 'Scheduled' && (
				<div className='game hide-pick-boxes'>
					{/* home team */}
					<label className='box no-pick'>
						<input
							type='radio'
							name={data.id}
							id='radio'
							value={homeTeamAbbr}
						/>
						<div className='logo'>
							<img
								src={`../mlb-icons/${homeTeamAbbr}.svg`}
								className='team-logo'
								alt=''
							/>
						</div>

						<div className='team-id'>
							<p> {homeTeamName}</p>
							<p className='home-away'> Home </p>
						</div>
					</label>

					{/* gametime */}
					<div className='game-time'>
						<p> {shortDetail} </p>
					</div>

					{/* away team */}
					<label className='box no-pick'>
						<input
							type='radio'
							name={data.id}
							id='radio'
							defaultValue={'no-pick'}
							checked
						/>
						<div className='logo'>
							<img
								src={`../mlb-icons/${awayTeamAbbr}.svg`}
								className='team-logo'
								alt=''
							/>
						</div>

						<div className='team-id'>
							<p> {awayTeamName}</p>
							<p className='home-away'> Away </p>
						</div>
					</label>
				</div>
			)}
		</div>
	);
};

export default PickBox;
