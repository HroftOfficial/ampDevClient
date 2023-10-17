import React from 'react';
import Slider from 'react-slick';
import Fancybox from './Fancybox';
import config from '../../settings/settings';
import './detailSlider.css';

const DetailSlider = ({ items }) => {
	const settings = {
		dots: true,
		infinite: true,
		// speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		// autoplay: true,
		lazyLoad: true,
		centerMode: true,
		adaptiveHeight: true,
		fade: true,
		arrows: true,
		// autoplaySpeed: 5000,
		className: 'slider',
	};
	// const itemFilter = items?.photo_url?.filter(f=>!f?.filename?.includes('pdf'));
	const itemFilter = items?.filter((f) => !f?.filename?.includes('pdf'));
	// console.log(items);
	// console.log('itemFilter', itemFilter)
	return (
		<Slider {...settings}>
			{/* {items?.photo_url?.map((item, index) => */}
			{itemFilter?.map((item, index) => (
				<Fancybox key={index}>
					<a
						data-fancybox="images"
						data-src={item?.path?.replace(/public/i, config?.baseUrlUpload)}
					>
						<img
							loading="lazy"
							src={item?.path?.replace(/public/i, config?.baseUrlUpload)}
							className="object-cover imgDetail"
						/>
					</a>
				</Fancybox>
			))}
		</Slider>
	);
};

export default DetailSlider;
