import './App.css';
import { Header } from './components';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SpaceXHistory, SpaceXAddress } from './screens';

const App = () => (
	<div>
		<Header />
		<Routes>
			<Route path="/" element={<Navigate to="/History" />} />
			<Route path='/History' element={<SpaceXHistory />} />
			<Route path='/Address' element={<SpaceXAddress />} />

		</Routes>
	</div>
);

export default App;
