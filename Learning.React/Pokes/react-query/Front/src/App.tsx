import React from 'react';
import Todos from "./domains/todos/Todos";
import ReactQueryProvider from "./domains/configuration/ReactQueryProvider";

const App = () =>
	<ReactQueryProvider>
		<Todos/>
	</ReactQueryProvider>

export default App;
