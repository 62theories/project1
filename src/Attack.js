import React from "react"
import firebase from "./components/firebase.js"
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from "recharts"
import moment from "moment"
import { Link } from "react-router-dom"
import "./assets/css/argon-dashboard.css"
export default class Attack extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			deauth: 0,
			probe: 0,
			items: [],
			probeGraph: [],
			deauthGraph: [],
			probeAmount: 0,
			deauthAmount: 0
		}
	}

	componentDidMount = async () => {
		const stateRef = firebase.database().ref("count")
		const stateRef2 = firebase.database().ref("Monitor")
		stateRef.on("value", async snapshot => {
			stateRef2.once("value", async snapshot => {
				let items = snapshot.val()
				if (items) this.setState({ items: items })
				{
					this.isDeauthAttack()
				}
				{
					this.isProbeAttack()
				}
			})
		})
	}

	isDeauthAttack = async () => {
		await this.setState({
			deauthGraph: []
		})
		let deauthGraph = []
		this.state.items.forEach(item => {
			if (item.Data) {
				for (let i in item.Data) {
					if (
						i === "Deauth" &&
						// Object.keys(item.Data[i]).length > this.state.deauth &&
						this.state.deauth !== 0 &&
						this.state.deauth
					) {
						let count = 0
						for (let j in item.Data[i]) {
							if (j === this.props.location.state.mac) {
								count = Object.keys(item.Data[i][j]).length
							}
						}

						if (count > this.state.deauth) {
							deauthGraph.push({
								name: `${moment(item.Time).format(
									"DD/MM, h:mm a"
								)}`,
								amount: count
							})
						}
					}
					if (
						i === "Deauth" &&
						Object.keys(item.Data[i]).length > this.state.deauth &&
						this.state.deauth !== 0
					) {
					}
				}
			}
		})
		let bigdeauthGraph = [...this.state.deauthGraph, ...deauthGraph]
		this.setState({ deauthAmount: bigdeauthGraph.length })
		let smalldeauthGraph = []
		let countDeauth = 1
		for (let i = bigdeauthGraph.length - 1; i >= 0; i--) {
			if (countDeauth <= 5) {
				smalldeauthGraph.push(bigdeauthGraph[i])
				countDeauth++
			}
		}
		smalldeauthGraph.reverse()
		this.setState({
			deauthGraph: smalldeauthGraph
		})
	}

	isProbeAttack = async () => {
		await this.setState({
			probeGraph: []
		})
		let probeGraph = []
		this.state.items.forEach(item => {
			if (item.Data) {
				for (let i in item.Data) {
					if (
						i === "Probe" &&
						// Object.keys(item.Data[i]).length > this.state.probe &&
						this.state.probe !== 0 &&
						this.state.probe
					) {
						let count = 0
						for (let j in item.Data[i]) {
							if (j === this.props.location.state.mac) {
								count = Object.keys(item.Data[i][j]).length
							}
						}

						if (count > this.state.probe) {
							probeGraph.push({
								name: `${moment(item.Time).format(
									"DD/MM, h:mm a"
								)}`,
								amount: count
							})
						}
					}
					if (
						i === "Deauth" &&
						Object.keys(item.Data[i]).length > this.state.deauth &&
						this.state.deauth !== 0
					) {
					}
				}
			}
		})
		let bigProbeGraph = [...this.state.probeGraph, ...probeGraph]
		this.setState({ probeAmount: bigProbeGraph.length })
		let smallProbeGraph = []
		let countProbe = 1
		for (let i = bigProbeGraph.length - 1; i >= 0; i--) {
			if (countProbe <= 5) {
				smallProbeGraph.push(bigProbeGraph[i])
				countProbe++
			}
		}
		smallProbeGraph.reverse()
		this.setState({
			probeGraph: smallProbeGraph
		})
	}

	renderProbe = () => {
		return (
			<div className='d-flex align-items-center justify-content-center'>
				<div>
					{this.state.items.length > 0 &&
					this.state.probeGraph.length > 0 ? (
						<div style={{ height: "40vh", width: "50vw" }}>
							<ResponsiveContainer width='100%' height='100%'>
								<BarChart
									data={this.state.probeGraph}
									margin={{
										top: 5,
										right: 30,
										left: 20,
										bottom: 5
									}}
								>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='name' />
									<YAxis />
									<Tooltip />
									<Legend />
									<Bar dataKey='amount' fill='#8884d8' />\
								</BarChart>
							</ResponsiveContainer>
						</div>
					) : (
						<div
							className='d-flex align-items-center justify-content-center'
							style={{
								height: "40vh",
								width: "50vw"
							}}
						>
							<div className='pt'>
								<h1>NO PROBE REQUEST ATTACK FOUND</h1>
							</div>
						</div>
					)}
					<div className='d-flex align-items-center justify-content-center'>
						<form className='form-inline'>
							<label>Detect Value </label>
							<input
								name='probe'
								type='number'
								value={this.state.probe}
								placeholder='probe'
								onChange={e => {
									this.setState({
										[e.target.name]: e.target.value
									})
								}}
								autoComplete='off'
								className='form-control ml-3'
							/>
							<button
								type='button'
								onClick={this.isProbeAttack}
								className='btn btn-success ml-3'
							>
								DETECT
							</button>
						</form>
					</div>

					<div className='text-center mt-3'>
						PROBE ATTACK FOUND:{this.state.probeAmount}
					</div>
				</div>
			</div>
		)
	}

	renderDeauth = () => {
		return (
			<div className='d-flex align-items-center justify-content-center'>
				<div>
					{this.state.items.length > 0 &&
					this.state.deauthGraph.length > 0 ? (
						<div style={{ height: "40vh", width: "50vw" }}>
							<ResponsiveContainer width='100%' height='100%'>
								<BarChart
									data={this.state.deauthGraph}
									margin={{
										top: 5,
										right: 30,
										left: 20,
										bottom: 5
									}}
								>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='name' />
									<YAxis />
									<Tooltip />
									<Legend />
									<Bar dataKey='amount' fill='#FF5733' />
								</BarChart>
							</ResponsiveContainer>
						</div>
					) : (
						<div
							className='d-flex align-items-center justify-content-center'
							style={{
								height: "40vh",
								width: "50vw"
							}}
						>
							<div className='pt'>
								<h1>NO DEAUTHENTICATION ATTACK FOUND</h1>
							</div>
						</div>
					)}
					<div className='d-flex align-items-center justify-content-center'>
						<form className='form-inline'>
							<label>Detect Value </label>
							<input
								name='deauth'
								type='number'
								value={this.state.deauth}
								placeholder='probe'
								onChange={e => {
									this.setState({
										[e.target.name]: e.target.value
									})
								}}
								autoComplete='off'
								className='form-control ml-3'
							/>
							<button
								type='button'
								onClick={this.isDeauthAttack}
								className='btn btn-success ml-3'
							>
								DETECT
							</button>
						</form>
					</div>

					<div className='text-center mt-3'>
						DEAUTH ATTACK FOUND:{this.state.deauthAmount}
					</div>
				</div>
			</div>
		)
	}

	renderDashboard = () => (
		<div class='main-content'>
			<div
				class='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'
				style={{
					"min-height": "600px",
					"background-size": "cover",
					"background-position": "center top"
				}}
			>
				<span class='mask bg-gradient-default opacity-8'></span>
				<div class='container-fluid d-flex align-items-center'>
					<div class='row'>
						<div class='col-lg-12 col-md-10'>
							<h1 class='display-2 text-white'>
								DEVICE: {this.props.location.state.mac}
							</h1>
						</div>
					</div>
				</div>
			</div>

			<div class='container-fluid mt--7'>
				<div class='row'>
					<div class='container-fluid mt--7'>
						<div class='row'>
							<div class='col-xl-12 order-xl-2 mb-5 mb-xl-0'>
								<div class='card card-profile shadow mt-4'>
									<div class='card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4'></div>
									<div class='card-body pt-0 pt-md-4'>
										{this.renderProbe()}
									</div>
								</div>
								<div class='card card-profile shadow mt-4'>
									<div class='card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4'></div>
									<div class='card-body pt-0 pt-md-4'>
										{this.renderDeauth()}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<footer class='footer'></footer>
			</div>
		</div>
	)

	renderDeauthPage = () => (
		<div class='main-content'>
			<div
				class='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'
				style={{
					"min-height": "600px",
					"background-size": "cover",
					"background-position": "center top"
				}}
			>
				<span class='mask bg-gradient-default opacity-8'></span>
				<div class='container-fluid d-flex align-items-center'>
					<div class='row'>
						<div class='col-lg-12 col-md-10'>
							<h1 class='display-2 text-white'>
								DEAUTHENTICATION ATTACK
							</h1>
						</div>
					</div>
				</div>
			</div>

			<div class='container-fluid mt--7'>
				<div class='row'>
					<div class='container-fluid mt--7'>
						<div class='row'>
							<div class='col-xl-12 order-xl-2 mb-5 mb-xl-0'>
								<div class='card card-profile shadow mt-4'>
									<div class='card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4'></div>
									<div class='card-body pt-0 pt-md-4'>
										{this.renderDeauth()}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<footer class='footer'></footer>
			</div>
		</div>
	)

	render() {
		return (
			<div>
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
								RECORDS AMOUNT:{this.state.items.length}
							</div>
							<hr />
							<ul class='navbar-nav'>
								<li class='nav-item'>
									<Link class='nav-link ' to='/'>
										{" "}
										<i class='ni ni-tv-2 text-primary'></i>{" "}
										Dashboard
									</Link>
								</li>
								<li class='nav-item'>
									<Link class='nav-link ' to='/deauth'>
										<i class='ni ni-planet text-blue'></i>{" "}
										Deauth
									</Link>
								</li>
								<li class='nav-item'>
									<Link class='nav-link ' to='/probe'>
										<i class='ni ni-pin-3 text-orange'></i>{" "}
										Probe
									</Link>
								</li>
								<li class='nav-item'>
									<Link class='nav-link ' to='/mac'>
										<i class='ni ni-pin-3 text-orange'></i>{" "}
										Device
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				{this.renderDashboard()}
			</div>
		)
	}
}
