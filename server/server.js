const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const schedule = require('node-schedule');

dotenv.config();

// set up express server
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'https://pick-master.netlify.app',
			'http://192.168.1.22:3000',
		],
		credentials: true,
	})
);
app.use(cookieParser());

app.use('/picks', require('./routers/userPicksRouter'));
app.use('/pool', require('./routers/poolRouter'));
app.use('/auth', require('./routers/userRouter'));
app.use('/loggedIn', require('./routers/loggedInRouter'));

// connect to mongodb
mongoose.connect(
	process.env.MDB_CONNECT_STRING,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) return console.error(err);
		console.log('Connected to MongoDB');
	}
);

let sheduleDate = 20220811;
let num = 127;

// schedule + highlight clips
app.get('/schedule', async (req, res) => {
	const response = await axios.get(
		`https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=${sheduleDate}`
	);
	const news = response.data;
	res.status(200).send(news);
});

// news | highlight videos
app.get('/news/:num', async (req, res) => {
	const num = req.params.num;
	const response = await axios.get(
		`https://site.web.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?region=us&lang=en&contentorigin=espn&limit=100&calendartype=blacklist&includeModules=videos%2Ccards&dates=${num}&tz=America%2FNew_York&buyWindow=1m&showAirings=buy%2Clive&showZipLookup=true`
	);
	const data = response.data;
	res.status(200).send(data);
});

// predictions
app.get('/predictions', async (req, res) => {
	const response = await axios.get(
		`https://levy-edge.statsinsider.com.au/round/matches?Sport=MLB&Round=${num}&Season=2022&strip=false&best_bets=true&bookmakers=fanduel,betmgm,pointsbet,william_hill,draftkings,unibet`
	);
	const data = response.data;
	res.status(200).send(data);
});

// expert picks for pool
app.get('/expert-picks', async (req, res) => {
	const response = await axios.get(
		`https://api.pickwatch.com/v1/picks/mlb/2022/${num}/su/combined/true/25/0`
	);
	const data = response.data;
	res.status(200).send(data);
});

app.listen(PORT, () =>
	console.log(`Hello Master Bweem, the server is running on ${PORT}.`)
);
