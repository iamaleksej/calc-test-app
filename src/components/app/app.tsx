import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages";
import AppHeader from "../app-header";
import './app.sass';


export default class App extends React.Component {

	render() {
		return (
			<>
				<AppHeader />
				<main role="main" className="container">
					<Routes>
						<Route
							path="/"
							element={<HomePage />}
						/>
					</Routes>
				</main>
			</>
		)
	}
}
