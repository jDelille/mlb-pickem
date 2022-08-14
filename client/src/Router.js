import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gamebar from './component/gamebar/Gamebar';
import Navbar from './component/navbar/Navbar';
import Pool from './pages/pool/Pool';
import domain from './util/domain';
import PicksPage from './pages/picks/PicksPage';
import axios from 'axios';
import { UserContextProvider } from '../src/context/UserContext';

// styles
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './Themes.js';
import Home from './pages/home/Home';

// STYLED COMPONENT
const StyledApp = styled.div``;

axios.defaults.withCredentials = true;

function Router() {
	const [theme, setTheme] = useState(false);

	const [data, setData] = useState([]);
	const [toggle, setToggle] = useState(false);

	const [register, setRegister] = useState(false);
	const [login, setLogin] = useState(false);

	// fetch schedule from backend
	useEffect(() => {
		fetch(`${domain}/schedule`)
			.then((res) => res.json())
			.then((data) => {
				setData(data.events);
			});
	}, []);

	// sort games by id
	let sortedGames = data.sort(function (a, b) {
		return a.date - b.date;
	});

	return (
		<UserContextProvider>
			<BrowserRouter>
				<ThemeProvider theme={theme ? lightTheme : darkTheme}>
					<GlobalStyles />
					<StyledApp className='App primary'>
						<Navbar
							toggle={toggle}
							setToggle={setToggle}
							setRegister={setRegister}
							setLogin={setLogin}
							register={register}
							login={login}
							setTheme={setTheme}
							theme={theme}
						/>
						<Routes>
							<Route
								exact
								path='/'
								element={
									<Home
										setRegister={setRegister}
										setLogin={setLogin}
										register={register}
										login={login}
									/>
								}
							/>
							<Route
								path='/picks'
								element={<PicksPage sortedGames={sortedGames} />}
							/>
							<Route
								path='/pool'
								element={<Pool sortedGames={sortedGames} setLogin={setLogin} />}
							/>
						</Routes>
					</StyledApp>
				</ThemeProvider>
			</BrowserRouter>
		</UserContextProvider>
	);
}

export default Router;
