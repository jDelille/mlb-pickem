import React from 'react';
import moment from 'moment';
import './Predictions.scss';

const Predictions = ({ game }) => {
	let homePercent = Math.round(
		game.BettingData.draftkings.HomeLineWinPct * 100
	);
	let awayPercent = Math.round(
		game.BettingData.draftkings.AwayLineWinPct * 100
	);

	if (game.BettingData.draftkings.HomeLineWinPct)
		return (
			<div className='game third'>
				<div className='header'>
					<div className='time'>
						{moment(game.MatchData.Date).format('  h:mm a')}
					</div>
					<p className='matchup'>
						{game.MatchData.HomeTeam.Nickname} vs{' '}
						{game.MatchData.AwayTeam.Nickname}
					</p>
				</div>
				<div className='body'>
					<div className='teams'>
						<div className='home'>
							<img
								src={`../mlb-icons/${game.MatchData.HomeTeam.Abv}.svg`}
								alt=''
							/>
							<p>{game.MatchData.HomeTeam.Abv}</p>
						</div>
						<div className='away'>
							<img
								src={`../mlb-icons/${game.MatchData.AwayTeam.Abv}.svg`}
								alt=''
							/>
							<p>{game.MatchData.AwayTeam.Abv}</p>
						</div>
					</div>
					<div className='odds'>
						<div className='home'>
							<div className='bar'>
								<div
									className={
										homePercent > 50
											? 'percent'
											: homePercent === 50
											? 'tied'
											: 'loser-percent'
									}
									style={{
										width: homePercent * 2,
									}}></div>
							</div>
							<p className={homePercent > 50 ? 'winner' : 'loser'}>
								{homePercent}%
							</p>
						</div>
						<div className='away'>
							<div className='bar'>
								<div
									className={
										awayPercent > 50
											? 'percent'
											: awayPercent === 50
											? 'tied'
											: 'loser-percent'
									}
									style={{
										width: awayPercent * 2,
									}}></div>
							</div>
							<p className={awayPercent > 50 ? 'winner' : 'loser'}>
								{awayPercent}%
							</p>
						</div>
					</div>
				</div>
			</div>
		);
};

export default Predictions;
