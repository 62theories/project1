import React from "react"
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"
import DashBoard from "./DashBoard"
import Deauth from "./Deauth"
import Probe from "./Probe"
import Mac from "./Mac"
import Attack from "./Attack"
import Beacon from "./Beacon"
import firebase from "./components/firebase.js"
import moment from "moment"
import _ from "lodash"
export default class App extends React.Component {

	state={
		time: new Date()
	}

	componentDidMount = () => {
		const stateRef = firebase.database().ref("time")
		stateRef.once("value", async snapshot => { 
			let items = snapshot.val()
			this.setState({
				time:items.time
			})
		})
		const stateRef2 = firebase.database().ref("probe")
		stateRef2.on("value", async snapshot => { 
			let items = snapshot.val()
			console.log(_.size(items))
		})		
	}

	render() {
		return (
			<>
			<BrowserRouter>
			<nav
					class='navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white'
					id='sidenav-main'
				>
					<div class='container-fluid'>
						<div
							class='collapse navbar-collapse'
							id='sidenav-collapse-main'
						>
							<div class='text-center'>
								LASTEST RECORD AT : {moment(this.state.time).format('DD/MM/YYYY  hh:mm:ss')}
							</div>
							<hr />
							<ul class='navbar-nav'>
								<li class='nav-item'>
									<Link class='nav-link ' to='/'>
										{" "}
										<i class='ni ni-tv-2 text-primary'></i>{" "}
										<strong>Dashboard</strong>
									</Link>
								</li>
								<li class='nav-item'>
									<Link class='nav-link ' to='/deauth'>
										<i class='ni ni-planet text-blue'></i>{" "}
										<strong>Deauth</strong> 
									</Link>
								</li>
								<li class='nav-item'>
									<Link class='nav-link ' to='/probe'>
										<i class='ni ni-pin-3 text-orange'></i>{" "}
										<strong>Probe</strong>
									</Link>
								</li>
								<li class='nav-item'>
									<Link class='nav-link ' to='/beacon'>
										<i class='ni ni-pin-3 text-orange'></i>{" "}
										<strong>Beacon</strong>
									</Link>
								</li>
								<li class='nav-item'>
									<Link class='nav-link ' to='/mac'>
										<i class='ni ni-pin-3 text-orange'></i>{" "}
										<strong>Device</strong>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<Switch>
					<Route path='/' exact={true} component={DashBoard} />
					<Route path='/deauth' exact={true} component={Deauth} />
					<Route path='/probe' exact={true} component={Probe} />
					<Route path='/mac' exact={true} component={Mac} />
					<Route path='/beacon' exact={true} component={Beacon}/>
					<Route path='/attack' exact={true} component={Attack} />
				</Switch>
			</BrowserRouter>
			</>
		)
	}
}
