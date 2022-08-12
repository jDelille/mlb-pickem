import moment from 'moment';
import React, { useEffect, useState } from 'react';
import domain from '../../util/domain';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import './Highlights.scss';

const Highlights = () => {
	const [data, setData] = useState([]);

	// get todays date and pass as param in fetch request
	let today = new Date();
	let res = today.toISOString().slice(0, 10).replace(/-/g, '');
	let theDate = Number(res);
	let [date, setDate] = useState(theDate);

	// fetch schedule from backend
	useEffect(() => {
		fetch(`${domain}/news/${date}`)
			.then((res) => res.json())
			.then((data) => {
				setData(data.videos);
			});
	}, []);

	document.querySelectorAll('.carousel').forEach((carousel) => {
		const items = carousel.querySelectorAll('.carousel-item');
	});

	return (
		<div className='highlights'>
			<div className='header'>
				<p> Highlights </p>
				<span> Click and drag to scroll</span>
			</div>

			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}>
				{data.map((highlight, index) => {
					return (
						<>
							<SwiperSlide>
								<div className='video'>
									<div className='img-container'>
										<video
											src={highlight.links.source.HD.href}
											controls></video>
									</div>
								</div>
								<div className='text'>
									<h1 className='headline'>{highlight.headline}</h1>
								</div>
							</SwiperSlide>
						</>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Highlights;

{
}
{
	/* <div className='text'>
	 */
}

{
	/* <p className='publish-date'>
						{moment(highlight.lastModified).format('MMMM DD')}
					</p>
					<p className='desc'>{highlight.description}</p>
					<p className='source'>Source: {highlight.source}</p> */
}
{
	/* </div> */
}
