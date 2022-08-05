import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/store';

let Box = styled.div`
	padding: 20px;
	color: grey;
`;
let YellowBtn = styled.button`
	background: ${(props) => props.bg};
	color: ${(props) => (props.bg == 'blue' ? 'white' : 'black')};
	padding: 10px;
`;

const Detail = (props) => {
	let { id } = useParams();
	let 찾은상품 = props.shoes.find(function (x) {
		return x.id == id;
	});

	let [alert, setAlert] = useState(true);
	let [tab, setTab] = useState(0);
	let dispatch = useDispatch();

	useEffect(() => {
		let 꺼낸거 = localStorage.getItem('watched');
		꺼낸거 = JSON.parse(꺼낸거);
		꺼낸거.push(찾은상품.id);
		localStorage.setItem('watched', JSON.stringify(꺼낸거));
	}, []);

	useEffect(() => {
		let a = setTimeout(() => {
			setAlert(false);
		}, 2000);
		return () => {
			clearTimeout(a);
		};
	}, []);

	return (
		<div className='container'>
			{alert == true ? <div className='alert'>구매시 할인</div> : null}
			<Box>
				<YellowBtn bg='blue'>버튼1임</YellowBtn>
				<YellowBtn bg='yellow'>버튼임</YellowBtn>
			</Box>
			<div className='row'>
				<div className='col-md-6'>
					<img
						src='https://codingapple1.github.io/shop/shoes1.jpg'
						width='100%'
					/>
				</div>
				<div className='col-md-6 mt-4'>
					<h4 className='pt-5'>{찾은상품.title}</h4>
					<p>{찾은상품.content}</p>
					<p>{찾은상품.price}원</p>
					<button
						className='btn btn-danger'
						onClick={() => {
							dispatch(addItem({ id: 1, name: 'Red Knit', count: 1 }));
						}}>
						주문하기
					</button>
				</div>
			</div>

			<Nav variant='tabs' defaultActiveKey='link0'>
				<Nav.Item>
					<Nav.Link
						onClick={() => {
							setTab(0);
						}}
						eventKey='link0'>
						버튼0
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						onClick={() => {
							setTab(1);
						}}
						eventKey='link1'>
						버튼1
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						onClick={() => {
							setTab(2);
						}}
						eventKey='link2'>
						버튼2
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<TabContent tab={tab} shoes={props.shoes} />
		</div>
	);
};

function TabContent({ tab, shoes }) {
	let [fade, setFade] = useState('');

	useEffect(() => {
		setTimeout(() => {
			setFade('end');
		}, 100);
		return () => {
			setFade('');
		};
	}, [tab]);

	return (
		<div className={'start ' + fade}>
			{[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
		</div>
	);
}

export default Detail;
