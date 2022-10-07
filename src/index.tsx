import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";
import HhService from "./services/hh-service";
import { HhServiceProvider } from "./components/hh-service-context";


import { store } from "./store";

const hhService = new HhService();

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
			<HhServiceProvider value={hhService}>
				<Router>
					<App />
				</Router>
			</HhServiceProvider>
		</ErrorBoundry>
	</Provider>,
	document.getElementById('wrapper')
);

export default hhService;