import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from "./domains/navigation/Navigation";

const App = () =>
	<BrowserRouter>
		<Navigation/>
	</BrowserRouter>

export default App;
