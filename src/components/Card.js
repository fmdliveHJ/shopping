import React from 'react';
function Card(props) {
	return (
		<div className='col-md-4'>
			<img
				src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'}
				width='80%'
			/>
			<h4>{props.shoes[0].title}</h4>
			<p>{props.shoes[0].price}</p>
		</div>
	);
}

export default Card;
