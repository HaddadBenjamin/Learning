import React from 'react';
import {ApolloWrapper} from "./domains/root/ApolloWrapper";
import { TodoList } from './domains/todos/components/TodoList';

const App = () =>
	<ApolloWrapper>
		<TodoList/>
	</ApolloWrapper>

export default App;
