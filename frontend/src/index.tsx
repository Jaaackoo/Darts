import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './layouts/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Game } from './layouts/Game';
import { Stack, Typography } from '@mui/material';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Stack height={60} justifyContent="center" alignItems="center" width="100%" sx={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }} direction="row" spacing={3}>
				<img src="/assets/cnf.jpeg" alt="cnf" width={100} height={60} />
				<Typography variant='h5'>
					Centrale Nantes Fléchettes
				</Typography>
				<img src="/assets/cnf.jpeg" alt="cnf" width={100} height={60} />

			</Stack>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/game' element={<Game />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode >
);

reportWebVitals();
