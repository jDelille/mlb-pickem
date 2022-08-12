// imports
import React from "react";
import axios from "axios";
import domain from "../../util/domain";

// styles
import "./ShowPicks.scss";

function ShowPicks({ picks, getPicks }) {

  // DELETE PICKS
  async function deletePicks() {
    if (window.confirm("Do you want to delete your picks?"))
      await axios.delete(`${domain}/picks/${picks._id}`);

    getPicks();
  }

  return (
    <div className="show-picks-page">
      <div className="user"></div>
      <div className="show-picks-container">
        <div className="show-picked">
          {!picks ? (
            <p> Loading </p>
          ) : (
            picks.picks.map((item, index) => {
              return (
                <div className="show-pick" key={index}>
                  <img src={`../mlb-icons/${item}.svg`} className="show-logo" alt="" />
                </div>
              );
            })
          )}
        </div>
        <div className="delete-picks">
          <button className="delete-btn" onClick={deletePicks}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowPicks;
