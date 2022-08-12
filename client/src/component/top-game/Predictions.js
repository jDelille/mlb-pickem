import React from 'react';
import moment from 'moment';

const Predictions = ({ game }) => {
	if (game.BettingData.draftkings.HomeLineWinPct)
		return (
			<div className='game'>
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
										Math.round(
											game.BettingData.draftkings.HomeLineWinPct * 100
										) > 50
											? 'percent'
											: 'loser-percent'
									}
									style={{
										width:
											Math.round(
												game.BettingData.draftkings.HomeLineWinPct * 100
											) * 2,
									}}></div>
							</div>
							<p
								className={
									Math.round(game.BettingData.draftkings.HomeLineWinPct * 100) >
									50
										? 'winner'
										: 'loser'
								}>
								{Math.round(game.BettingData.draftkings.HomeLineWinPct * 100)}%
							</p>
						</div>
						<div className='away'>
							<div className='bar'>
								<div
									className={
										Math.round(
											game.BettingData.draftkings.AwayLineWinPct * 100
										) > 50
											? 'percent'
											: 'loser-percent'
									}
									style={{
										width:
											Math.round(
												game.BettingData.draftkings.AwayLineWinPct * 100
											) * 2,
									}}></div>
							</div>
							<p
								className={
									Math.round(game.BettingData.draftkings.AwayLineWinPct * 100) >
									50
										? 'winner'
										: 'loser'
								}>
								{Math.round(game.BettingData.draftkings.AwayLineWinPct * 100)}%
							</p>
						</div>
					</div>
				</div>
			</div>
		);
};

export default Predictions;
