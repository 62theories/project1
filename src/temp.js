// import React from "react"
// import firebase from "./components/firebase.js"
// import CurrentValue from "./components/currentValue.js"
// import CurrentAttack from "./components/currentAttack.js"

// class App extends React.Component {
// 	state = {
// 		deauthInput: "",
// 		beaconInput: "",
// 		probeInput: "",
// 		deviceState: 1,
// 		isChoice: false
// 	}

// 	componentDidMount() {
// 		const stateRef = firebase.database().ref("Project/state")
// 		stateRef.on("value", snapshot => {
// 			let items = snapshot.val()
// 			// let newState = []
// 			// for (let item in items) {
// 			// 	newState.push({
// 			// 		item_id: item,
// 			// 		value: items[item]
// 			// 	})
// 			// }
// 			// console.log(newState[0].value)
// 			console.log(items)
// 			this.setState({ deviceState: items, isChoice: false })
// 		})
// 	}
// 	bluetoothDevice = null
// 	server = null

// 	handleScanButton = async e => {
// 		e.preventDefault()
// 		e.stopPropagation()
// 		try {
// 			this.bluetoothDevice = await navigator.bluetooth.requestDevice({
// 				filters: [
// 					{ services: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"] }
// 				]
// 			})
// 			// .then(async () => {
// 			// 	const service = await this.bluetoothDevice.gatt.getPrimaryService(
// 			// 		"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			// 	)
// 			// 	const characteristics = await service.getCharacteristic(
// 			// 		"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			// 	)
// 			// 	await characteristics.writeValue(new Int8Array([0x04]))
// 			// })
// 			console.log("Connecting to Bluetooth Device...")
// 			this.server = await this.bluetoothDevice.gatt.connect()
// 			console.log("> Bluetooth Device connected")
// 			this.bluetoothDevice.addEventListener(
// 				"gattserverdisconnected",
// 				() => console.log("> Bluetooth Device disconnected")
// 			)
// 			// this.setState({ isChoice: true })
// 		} catch (error) {
// 			console.log("error caught: " + error)
// 		}
// 		const service = await this.bluetoothDevice.gatt.getPrimaryService(
// 			"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 		)
// 		const characteristics = await service.getCharacteristic(
// 			"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 		)
// 		// await characteristics.writeValue(new Int8Array([1]))

// 		// await characteristics.writeValue(new Int8Array(["a".charCodeAt(0)]))
// 	}

// 	onSubmit = async event => {
// 		event.stopPropagation()
// 		event.preventDefault()
// 		const command = new Uint16Array([
// 			this.state.deauthInput,
// 			this.state.beaconInput,
// 			this.state.probeInput
// 		])
// 		try {
// 			const service = await this.bluetoothDevice.gatt.getPrimaryService(
// 				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			)
// 			const characteristics = await service.getCharacteristic(
// 				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			)
// 			await characteristics.writeValue(command)
// 			this.setState({ deviceState: 5 })
// 			console.log("value sent")
// 		} catch (error) {
// 			console.log("error is " + error)
// 		}
// 	}

// 	handleInput = ({ target }) => {
// 		this.setState({ [target.name]: target.value })
// 	}

// 	startTraining = async () => {
// 		try {
// 			const service = await this.bluetoothDevice.gatt.getPrimaryService(
// 				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			)
// 			const characteristics = await service.getCharacteristic(
// 				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			)
// 			await characteristics.writeValue(new Uint16Array([0x4]))
// 			this.setState({ deviceState: 5 })
// 			setTimeout(() => this.setState({ deviceState: 5 }), 15000)
// 			console.log("start training")
// 		} catch (error) {
// 			console.log("error is" + error)
// 		}
// 	}

// 	handleCustomize = async () => {
// 		try {
// 			const service = await this.bluetoothDevice.gatt.getPrimaryService(
// 				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			)
// 			const characteristics = await service.getCharacteristic(
// 				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			)
// 			this.setState({ deviceState: 5 })
// 			await characteristics.writeValue(new Uint16Array([0x5]))

// 			console.log("start receiving realtime value")
// 		} catch (error) {
// 			console.log("error is" + error)
// 		}
// 	}

// 	render() {
// 		if (this.state.deviceState === 1) {
// 			if (!this.state.isChoice) {
// 				return (
// 					<div
// 						style={{ backgroundColor: "#272b30", height: "100%" }}
// 						className='container-fluid'
// 					>
// 						<div
// 							style={{ height: "40%" }}
// 							className='d-flex align-items-end justify-content-center'
// 						>
// 							<h4 className='text-light'>
// 								Welcome to WiFi Attack Detector
// 							</h4>
// 						</div>
// 						<div
// 							style={{ marginTop: "15px" }}
// 							className='d-flex justify-content-center'
// 						>
// 							<button
// 								onClick={this.handleScanButton}
// 								className='btn btn-success btn-lg'
// 							>
// 								scan for your device
// 							</button>
// 						</div>
// 					</div>
// 				)
// 			} else {
// 				return (
// 					<div
// 						style={{ backgroundColor: "#272b30", height: "100%" }}
// 						className='d-flex align-items-center justify-content-center'
// 					>
// 						<div>
// 							<div style={{ marginBottom: "20px" }}>
// 								<button
// 									type='button'
// 									className='btn-block btn-lg btn-primary'
// 									onClick={this.startTraining}
// 								>
// 									start learning
// 								</button>
// 							</div>
// 							<div>
// 								<button
// 									type='button'
// 									className='btn-block btn-lg btn-success'
// 									onClick={this.handleCustomize}
// 								>
// 									use customize value
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				)
// 			}
// 		} else if (this.state.deviceState === 2) {
// 			return (
// 				<div
// 					style={{ backgroundColor: "#272b30", height: "100%" }}
// 					className='d-flex align-items-center justify-content-center'
// 				>
// 					<h4 className='text-light'>Training, Please wait.&nbsp;</h4>

// 					<div class='spinner-border text-light' role='status'>
// 						<span class='sr-only'>Loading...</span>
// 					</div>
// 				</div>
// 			)
// 		} else if (this.state.deviceState == 3) {
// 			return (
// 				<div
// 					style={{ backgroundColor: "#272b30", height: "100%" }}
// 					className='d-flex align-items-center justify-content-center'
// 				>
// 					<div>
// 						<form
// 							onSubmit={this.onSubmit}
// 							style={{ margin: "5px" }}
// 						>
// 							<div className='form-group'>
// 								<input
// 									name='deauthInput'
// 									onChange={this.handleInput}
// 									type='number'
// 									required
// 									placeholder='deauth'
// 									autoComplete='off'
// 								/>
// 							</div>
// 							<div className='form-group'>
// 								<input
// 									name='beaconInput'
// 									onChange={this.handleInput}
// 									type='number'
// 									required
// 									placeholder='beacon'
// 									autoComplete='off'
// 								/>
// 							</div>
// 							<div className='form-group'>
// 								<input
// 									name='probeInput'
// 									onChange={this.handleInput}
// 									type='number'
// 									required
// 									placeholder='probe'
// 									autoComplete='off'
// 								/>
// 							</div>

// 							<button className='btn-block btn-lg btn-success'>
// 								send value
// 							</button>
// 						</form>
// 						<CurrentValue />
// 					</div>
// 				</div>
// 			)
// 		} else if (this.state.deviceState == 4) {
// 			return (
// 				<div
// 					style={{ backgroundColor: "#272b30", height: "100%" }}
// 					className='d-flex align-items-center justify-content-center'
// 				>
// 					<CurrentAttack />
// 				</div>
// 			)
// 		} else if (this.state.deviceState === 5) {
// 			return (
// 				<div
// 					style={{ backgroundColor: "#272b30", height: "100%" }}
// 					className='d-flex align-items-center justify-content-center'
// 				>
// 					<div class='spinner-border text-light' role='status'>
// 						<span class='sr-only'>Loading...</span>
// 					</div>
// 				</div>
// 			)
// 		}
// 	}
// }

// export default App

// import React from "react"
// import firebase from "./components/firebase.js"
// import CurrentValue from "./components/currentValue.js"
// import CurrentAttack from "./components/currentAttack.js"
// import Scan from "./views/Scan"
// import WiFiPassWord from "./views/WifiPassword"
// import Loading from "./views/Loading"

// export default class App extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		this.bluetoothDevice = null
// 		this.server = null
// 		this.state = {
// 			webState: 1,
// 			ssid: "",
// 			password: ""
// 		}
// 	}

// 	sendValue8bit = async value => {
// 		if (this.bluetoothDevice) {
// 			const service = await this.bluetoothDevice.gatt.getPrimaryService(
// 				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			)
// 			const characteristics = await service.getCharacteristic(
// 				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			)
// 			await characteristics.writeValue(value)
// 			console.log("bluetooth sent")
// 		} else {
// 			alert("this.bluetoothDevice === null")
// 		}
// 	}

// 	handleInput = e => {
// 		this.setState({
// 			[e.target.name]: e.target.value
// 		})
// 	}

// 	handleScanButton = async e => {
// 		e.preventDefault()
// 		e.stopPropagation()
// 		try {
// 			this.bluetoothDevice = await navigator.bluetooth.requestDevice({
// 				filters: [
// 					{ services: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"] }
// 				]
// 			})
// 			console.log("Connecting to Bluetooth Device...")
// 			this.server = await this.bluetoothDevice.gatt.connect()
// 			console.log("> Bluetooth Device connected")
// 			this.bluetoothDevice.addEventListener(
// 				"gattserverdisconnected",
// 				() => {
// 					alert("> Bluetooth Device disconnected")
// 				}
// 			)
// 		} catch (error) {
// 			console.log("error caught: " + error)
// 		}

// 		if (this.bluetoothDevice) {
// 			const service = await this.bluetoothDevice.gatt.getPrimaryService(
// 				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			)
// 			const characteristics = await service.getCharacteristic(
// 				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			)
// 			await characteristics.writeValue(new Int8Array([1]))
// 			this.setState({ webState: 2 })
// 		}
// 	}

// 	sendWiFiPassword = async e => {
// 		e.preventDefault()
// 		let ssid = new Int8Array(20)
// 		for (let i = 0; i < this.state.ssid.length; i++) {
// 			ssid[i] = this.state.ssid.charCodeAt(i)
// 		}
// 		let password = new Int8Array(20)
// 		for (let i = 0; i < this.state.password.length; i++) {
// 			password[i] = this.state.password.charCodeAt(i)
// 		}
// 		if (this.bluetoothDevice) {
// 			const service = await this.bluetoothDevice.gatt.getPrimaryService(
// 				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			)
// 			const characteristics = await service.getCharacteristic(
// 				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
// 			)
// 			await characteristics.writeValue(ssid)
// 			await characteristics.writeValue(password)
// 			this.setState({ webState: 3 })
// 		} else {
// 			alert("can not send wifi password")
// 		}
// 	}

// 	render() {
// 		if (this.state.webState === 1) {
// 			return <Scan handleScanButton={this.handleScanButton} />
// 		} else if (this.state.webState === 2) {
// 			return (
// 				<WiFiPassWord
// 					handleInput={this.handleInput}
// 					onSubmit={this.sendWiFiPassword}
// 				/>
// 			)
// 		} else if (this.state.webState === 3) {
// 			return <Loading />
// 		}
// 	}
// }

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
import "./assets/css/argon-dashboard.css"
export default class App extends React.Component {
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
						Object.keys(item.Data[i]).length > this.state.deauth &&
						this.state.deauth !== 0 &&
						this.state.deauth
					) {
						deauthGraph.push({
							name: `${moment(item.Time).format(
								"DD/MM, h:mm a"
							)}`,
							amount: Object.keys(item.Data[i]).length
						})
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
						Object.keys(item.Data[i]).length > this.state.probe &&
						this.state.probe !== 0 &&
						this.state.probe
					) {
						probeGraph.push({
							name: `${moment(item.Time).format(
								"DD/MM, h:mm a"
							)}`,
							amount: Object.keys(item.Data[i]).length
						})
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
								// backgroundColor: "gray",
								// color: "#fff",
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
					<div className='text-center mt-3'>
						LASTED ATTACK:{ this.state.probeAmount > 0 ? Date.now() : null}
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
								// backgroundColor: "gray",
								// color: "#fff",
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
<div className='text-center mt-3'>
						LASTED ATTACK:{ this.state.deauthAmount > 0 ? Date.now() : null}
					</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			// <div>
			// 	<h1 className='text-center'>
			// 		RECORDS AMOUNT:{this.state.items.length}
			// 	</h1>
			// 	<div className='d-flex'>
			// 		{this.renderDeauth()}
			// 		{this.renderProbe()}
			// 	</div>
			// </div>
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
							{/* <div class='navbar-collapse-header d-md-none'>
								<div class='row'>
									<div class='col-6 collapse-brand'>
										<a href='../index.html'>
											<img src='../assets/img/brand/blue.png' />
										</a>
									</div>
									<div class='col-6 collapse-close'>
										<button
											type='button'
											class='navbar-toggler'
											data-toggle='collapse'
											data-target='#sidenav-collapse-main'
											aria-controls='sidenav-main'
											aria-expanded='false'
											aria-label='Toggle sidenav'
										>
											<span></span>
											<span></span>
										</button>
									</div>
								</div>
							</div> */}
							<div class='text-center'>
								RECORDS AMOUNT:{this.state.items.length}
							</div>
							<hr />
							<ul class='navbar-nav'>
								<li class='nav-item'>
									<a class=' nav-link ' href=' ../index.html'>
										{" "}
										<i class='ni ni-tv-2 text-primary'></i>{" "}
										Dashboard
									</a>
								</li>
								<li class='nav-item'>
									<a
										class='nav-link '
										href='../examples/icons.html'
									>
										<i class='ni ni-planet text-blue'></i>{" "}
										Deauth
									</a>
								</li>
								<li class='nav-item'>
									<a
										class='nav-link '
										href='../examples/maps.html'
									>
										<i class='ni ni-pin-3 text-orange'></i>{" "}
										Probe
									</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div class='main-content'>
					<div
						class='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'
						style={{
							"min-height": "600px",
							// "background-color": "blue",
							"background-size": "cover",
							"background-position": "center top"
						}}
					>
						<span class='mask bg-gradient-default opacity-8'></span>
						<div class='container-fluid d-flex align-items-center'>
							<div class='row'>
								<div class='col-lg-12 col-md-10'>
									<h1 class='display-2 text-white'>
										WIFI ATTACK DETECTOR
									</h1>
									<p class='text-white mt-0 mb-5'>
										Real-time monitoring WiFi Network and
										attacks detection using NodeMCU and
										Firebase.
									</p>
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
											{/* <div class='row justify-content-center'>
												<div class='col-lg-3 order-lg-2'>
													<div class='card-profile-image'>
														<a href='#'>
															<img
																src='../assets/img/theme/team-4-800x800.jpg'
																class='rounded-circle'
															/>
														</a>
													</div>
												</div>
											</div> */}
											<div class='card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4'></div>
											<div class='card-body pt-0 pt-md-4'>
												{this.renderProbe()}
											</div>
										</div>
										<div class='card card-profile shadow mt-4'>
											{/* <div class='row justify-content-center'>
												<div class='col-lg-3 order-lg-2'>
													<div class='card-profile-image'>
														<a href='#'>
															<img
																src='../assets/img/theme/team-4-800x800.jpg'
																class='rounded-circle'
															/>
														</a>
													</div>
												</div>
											</div> */}
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
			</div>
		)
	}
}

// import React from "react"
// import "./assets/css/argon-dashboard.css"

// export default class App extends React.Component {
// 	render() {
// 		return (

// 		)
// 	}
// }

{
	/* <div class='row'>
													<div class='col'>
														<div class='card-profile-stats d-flex justify-content-center mt-md-5'>
															<div>
																<span class='heading'>
																	22
																</span>
																<span class='description'>
																	Friends
																</span>
															</div>
															<div>
																<span class='heading'>
																	10
																</span>
																<span class='description'>
																	Photos
																</span>
															</div>
															<div>
																<span class='heading'>
																	89
																</span>
																<span class='description'>
																	Comments
																</span>
															</div>
														</div>
													</div>
												</div>
												<div class='text-center'>
													<h3>
														Jessica Jones
														<span class='font-weight-light'>
															, 27
														</span>
													</h3>
													<div class='h5 font-weight-300'>
														<i class='ni location_pin mr-2'></i>
														Bucharest, Romania
													</div>
													<div class='h5 mt-4'>
														<i class='ni business_briefcase-24 mr-2'></i>
														Solution Manager -
														Creative Tim Officer
													</div>
													<div>
														<i class='ni education_hat mr-2'></i>
														University of Computer
														Science
													</div>
													<hr class='my-4' />
													<p>
														Ryan — the name taken by
														Melbourne-raised,
														Brooklyn-based Nick
														Murphy — writes,
														performs and records all
														of his own music.
													</p>
													<a href='#'>Show more</a>
												</div> */
}
