import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Card from '../components/Card';
import './App.scss';
import data from '../components/data.js';
import Detail from '../pages/detail.js';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import About from '../pages/about';

function App() {
	let [shoes] = useState(data);
	let navigate = useNavigate();

	useEffect(() => {}, []);

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
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div className='main-bg'></div>
			<Routes>
				<Route
					path='/'
					element={
						<div className='container'>
							<div className='row'>
								{shoes.map((a, i) => {
									return <Card shoes={shoes} i={i + 1} key={a.id} />;
								})}
							</div>
						</div>
					}
				/>
				<Route path='/detail/:id' element={<Detail shoes={shoes} />} />
				<Route path='/*' element={<div>없는 페이지 입니다.</div>} />

				<Route path='/about' element={<About />}>
					<Route path='member' element={<div>멤버들</div>} />
					<Route path='location' element={<div>회사위치</div>} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
