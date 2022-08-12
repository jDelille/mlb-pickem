// imports
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import UserContext from '../../context/UserContext';
import domain from '../../util/domain';

// components
import Login from '../../Auth/Login';
import Register from '../../Auth/Register';
import MakePicks from './MakePicks';
import ShowPicks from './ShowPicks';

// styles
import './PicksPage.scss';

const PicksPage = ({ sortedGames, data, labels }) => {

  const [register, setRegister] = useState(true);
  const [login, setLogin] = useState(false);

  // get user
  const { user } = useContext(UserContext);

  // store picks
  const [picks, setPicks] = useState([]);
  // store email
  const [email, setEmail] = useState('');
  // store username
  const [username, setUsername] = useState('');

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

  // Render the picks
  function renderPicks() {
    let sortedPicks = [...picks];
    // sort picks by most recent
    sortedPicks = sortedPicks.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    // return the sorted picks
    return sortedPicks.map((picks, i) => {
      return (
        <ShowPicks
          key={i}
          picks={picks}
          getPicks={getPicks}
          data={data}
        />
      );
    });
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
      // window.location.reload();
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
    }
  }

  return (
    <div className='picks-page'>
      {picks.length < 0 ? (
        <p className='picks-label'>Make your picks</p>
      ) : (<p className='picks-label'>Your Picks</p>
      )}
      {picks.length > 0
        ? renderPicks()
        : user && (
          <>
            <MakePicks
              data={data}
              addPicks={addPicks}
              pick={pick}
              setPick={setPick}
              labels={labels}
              sortedGames={sortedGames}
            />
          </>
        )}
      {register && !user && (
        <Register setRegister={setRegister} setLogin={setLogin} />
      )}
      {login && !user && (
        <Login setLogin={setLogin} setRegister={setRegister} />
      )}

    </div>
  )
}

export default PicksPage