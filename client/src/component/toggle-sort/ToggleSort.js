import React from 'react';
import './ToggleSort.scss';

const ToggleSort = ({ setSort }) => {
	return (
		<div className='sort-container'>
			<h3 onClick={() => setSort(true)}>High to Low</h3>
			<h3 onClick={() => setSort(false)}>Low to High</h3>
		</div>
	);
};

export default ToggleSort;
