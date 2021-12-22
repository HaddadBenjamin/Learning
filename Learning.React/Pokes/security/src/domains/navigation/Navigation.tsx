import React from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	Link
} from "react-router-dom";
import Authentication from "../authentication/Authentication";

const Navigation = () =>
{
	return <>
		<h1>Navigation component</h1>
		
		<nav>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/about">About</Link></li>
				<li><Link to="/protected">Protected routes</Link></li>
			</ul>
		</nav>

		<Routes>
			<Route path="/" element={<>
				<h2>welcome at home</h2>
				<Authentication/>
			</>} />
			<Route path="about" element={<h2>About</h2>} />
			<Route path="protected" element={<h2>This route is protected, users must be logged to have access</h2>} />
		</Routes>
	</>
}



const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>

export default Navigation