import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Card from '../components/Card';
import './App.scss';
import data from '../components/data.js';
import Detail from '../pages/detail.js';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';

import axios from 'axios';
import Cart from '../components/Cart';
import { useQuery } from '@tanstack/react-query';
function App() {
	let [shoes, setShoes] = useState(data);
	let navigate = useNavigate();

	let result = useQuery('작명', () =>
		axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
			return a.data;
		})
	);

	console.log(result);

	return (
		<div className='App'>
			<Navbar bg='light' expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link
								onClick={() => {
									navigate('/');
								}}>
								홈
							</Nav.Link>
							<Nav.Link
								onClick={() => {
									navigate('/detail');
								}}>
								상세페이지
							</Nav.Link>
							<Nav.Link
								onClick={() => {
									navigate('/cart');
								}}>
								카트
							</Nav.Link>
						</Nav>
						<Nav className='ms-auto'></Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div className='main-bg'></div>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<div className='container'>
								<div className='row'>
									{shoes.map((a, i) => {
										return <Card shoes={shoes} i={i + 1} key={a.id} />;
									})}
								</div>
								<button
									onClick={() => {
										axios
											.get('https://codingapple1.github.io/shop/data2.json')
											.then((datas) => {
												let copy = [...shoes, ...datas.data];
												setShoes(copy);
											});
									}}>
									더보기
								</button>
							</div>
						</>
					}
				/>
				<Route path='/detail/:id' element={<Detail shoes={shoes} />} />
				<Route path='/*' element={<div>없는 페이지 입니다.</div>} />
				<Route path='/cart' element={<Cart />} />
			</Routes>
		</div>
	);
}

export default App;
