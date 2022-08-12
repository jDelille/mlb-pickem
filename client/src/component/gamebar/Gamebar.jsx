// imports 
import React from 'react'
import moment from 'moment';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

// styles
import './Gamebar.scss';

const Gamebar = ({ sortedGames }) => {

 const scrollRight = () => {
  let container = document.getElementById('container');
  sideScroll(container, 'right', 0, 420, 10);
 };

 const scrollLeft = () => {
  let container = document.getElementById('container');
  sideScroll(container, 'left', 0, 420, 10);
 }

 function sideScroll(element, direction, speed, distance, step) {
  let scrollAmount = 0;
  let slideTimer = setInterval(function () {
   if (direction === 'left') {
    element.scrollLeft -= step;
   } else {
    element.scrollLeft += step;
   }
   scrollAmount += step;
   if (scrollAmount >= distance) {
    window.clearInterval(slideTimer);
   }
  }, speed);
 }

 let gameMonth = moment(sortedGames[1]?.date).format('MMM');
 let gameDay = moment(sortedGames[1]?.date).format('D');

 return (
  <div className='top-gamebar'>
   <div className="date">
    <p> {gameMonth} </p>
    <p> {gameDay} </p>
   </div>
   <div className='gamebar' id='container'>
    {sortedGames.map((item, index) => {
     let home = item.competitions[0].competitors[0].team;
     let away = item.competitions[0].competitors[1].team;
     return <div className="game-box" key={index}>
      <p className='status'>{item.status.type.shortDetail}</p>
      <div className="home">
       <div className="logo-container">
        <img src={`../mlb-icons/${home.abbreviation}.svg`} alt="" className='logo' />
       </div>
       <p className='name'>{home.abbreviation}</p>
       <p className='record'>{item.competitions[0].competitors[0].records[0].summary}</p>
       <p className='score'>{item.competitions[0].competitors[0].score}</p>

      </div>
      <div className="away">
       <div className="logo-container">
        <img src={`../mlb-icons/${away.abbreviation}.svg`} alt="" className='logo' />
       </div>

       <p className='name'>{away.abbreviation}</p>
       <p className='record'>{item.competitions[0].competitors[1].records[0].summary}</p>
       <p className='score'>{item.competitions[0].competitors[1].score}</p>

      </div>
     </div>;
    })}
   </div>
   <div className="scroll-controls">
    <div className="left" id='slide' onClick={scrollLeft} >
     <AiOutlineLeft />
    </div>
    <div className="right" id='slide-back' onClick={scrollRight}>
     <AiOutlineRight />
    </div>
   </div>
  </div>
 )
}

export default Gamebar