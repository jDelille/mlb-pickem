// imports
import React, { useState } from 'react';
import $ from 'jquery';

// components
import PickBox from './PickBox';
import PicksPopup from './PicksPopup';

function MakePicks({ pick, setPick, addPicks, labels, sortedGames }) {
 // store locked boolean
 const [locked, setLocked] = useState(true);
 // store picks popup boolean
 const [popUp, setPopUp] = useState(false);

 const [count, setCount] = useState(0);

 function increment() {
  setCount(1);
 }

 // if a pick (radio button) is checked (yellow background) add to setPick array
 function handleSubmit() {
  let radios = document.querySelectorAll('#radio');
  for (let i = 0; i < radios.length; i++) {
   if (radios[i].checked) {
    setPick((prevState) => [...prevState, radios[i].value]);
   }
  }
 }

 // set background color for selected teams.
 $(document).ready(function () {
  $('input:radio').change(function () {
   var $this = $(this);
   $this.closest('.game').find('label.highlight').removeClass('highlight');
   $this.closest('.box').addClass('highlight');
  });
 });


 return (
  <div className='make-picks-page'>
   {/* Show the games */}
   <div className='make-picks-content'>
    {/* Render the game boxes  */}
    <div className='games-container'>
     {sortedGames.map((item, index) => {
      return <PickBox item={item} index={index} increment={increment} data={item} />;
     })}
     {/* Choose picks button  */}
     <div className='btn-container'>
      {count > 0 && (
       <button
        onClick={() => {
         handleSubmit();
         setLocked(false);
         setPopUp(true);
        }}
        className='add-btn'>
        Add Picks
       </button>
      )}
     </div>
    </div>
    {/* Show popup after submitting picks */}
    {popUp && (
     <div className='popup'>
      <PicksPopup
       addPicks={addPicks}
       pick={pick}
       setPopUp={setPopUp}
       setPick={setPick}
       labels={labels}
      />
     </div>
    )}
   </div>
  </div>
 );
}

export default MakePicks;
