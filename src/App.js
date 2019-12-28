import React from "react"
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"
import DashBoard from "./DashBoard"
import Deauth from "./Deauth"
import Probe from "./Probe"
import Mac from "./Mac"
import Attack from "./Attack"
export default class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' exact={true} component={DashBoard} />
					<Route path='/deauth' exact={true} component={Deauth} />
					<Route path='/probe' exact={true} component={Probe} />
					<Route path='/mac' exact={true} component={Mac} />
					<Route path='/attack' exact={true} component={Attack} />
				</Switch>
			</BrowserRouter>
		)
	}
}
