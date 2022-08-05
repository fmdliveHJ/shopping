import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './layouts/App';
import { Provider } from 'react-redux';
import store from './redux/store';

import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query';
const queryClient = new QueryClient(); //2번

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</QueryClientProvider>
);
