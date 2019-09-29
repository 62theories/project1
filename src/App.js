import React from "react"
import firebase from "./components/firebase.js"
import CurrentValue from "./components/currentValue.js"
import CurrentAttack from "./components/currentAttack.js"

class App extends React.Component {
	state = {
		deauthInput: "",
		beaconInput: "",
		probeInput: "",
		deviceState: 1
	}

	bluetoothDevice = null
	server = null

	handleScanButton = async e => {
		e.preventDefault()
		e.stopPropagation()
		try {
			this.bluetoothDevice = await navigator.bluetooth.requestDevice({
				acceptAllDevices: ["true"],
				optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"]
			})
			console.log("Connecting to Bluetooth Device...")
			this.server = await this.bluetoothDevice.gatt.connect()
			console.log("> Bluetooth Device connected")
			this.bluetoothDevice.addEventListener(
				"gattserverdisconnected",
				() => console.log("> Bluetooth Device disconnected")
			)
			this.setState({ deviceState: 2 })
		} catch (error) {
			console.log("error caught: " + error)
		}
	}

	onSubmit = async event => {
		event.stopPropagation()
		event.preventDefault()
		const command = new Uint8Array([
			this.state.deauthInput,
			this.state.beaconInput,
			this.state.probeInput
		])
		try {
			const service = await this.bluetoothDevice.gatt.getPrimaryService(
				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
			)
			const characteristics = await service.getCharacteristic(
				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
			)
			await characteristics.writeValue(command)
			this.setState({ deviceState: 5 })
			console.log("value sent")
		} catch (error) {
			console.log("error is " + error)
		}
	}

	handleInput = ({ target }) => {
		this.setState({ [target.name]: target.value })
	}

	startTraining = async () => {
		try {
			const service = await this.bluetoothDevice.gatt.getPrimaryService(
				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
			)
			const characteristics = await service.getCharacteristic(
				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
			)
			await characteristics.writeValue(new Uint8Array([0x4]))
			this.setState({ deviceState: 3 })
			setTimeout(() => this.setState({ deviceState: 5 }), 15000)
			console.log("start training")
		} catch (error) {
			console.log("error is" + error)
		}
	}

	handleCustomize = async () => {
		try {
			const service = await this.bluetoothDevice.gatt.getPrimaryService(
				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
			)
			const characteristics = await service.getCharacteristic(
				"4fafc201-1fb5-459e-8fcc-c5c9c331914b"
			)
			await characteristics.writeValue(new Uint8Array([0x5]))
			this.setState({ deviceState: 4 })
			console.log("start receiving realtime value")
		} catch (error) {
			console.log("error is" + error)
		}
	}

	render() {
		if (this.state.deviceState === 1) {
			return (
				<div
					style={{ backgroundColor: "#272b30", height: "100%" }}
					className='container-fluid'
				>
					<div
						style={{ height: "40%" }}
						className='d-flex align-items-end justify-content-center'
					>
						<h4 className='text-light'>
							Welcome to WiFi Attack Detector
						</h4>
					</div>
					<div
						style={{ marginTop: "15px" }}
						className='d-flex justify-content-center'
					>
						<button
							onClick={this.handleScanButton}
							className='btn btn-success btn-lg'
						>
							scan for your device
						</button>
					</div>
				</div>
			)
		} else if (this.state.deviceState === 2) {
			return (
				<div
					style={{ backgroundColor: "#272b30", height: "100%" }}
					className='d-flex align-items-center justify-content-center'
				>
					<div>
						<div style={{ marginBottom: "20px" }}>
							<button
								type='button'
								className='btn-block btn-lg btn-primary'
								onClick={this.startTraining}
							>
								start learning
							</button>
						</div>
						<div>
							<button
								type='button'
								className='btn-block btn-lg btn-success'
								onClick={this.handleCustomize}
							>
								use customize value
							</button>
						</div>
					</div>
				</div>
			)
		} else if (this.state.deviceState == 3) {
			return (
				<div
					style={{ backgroundColor: "#272b30", height: "100%" }}
					className='d-flex align-items-center justify-content-center'
				>
					<h4 className='text-light'>Training, Please wait.&nbsp;</h4>

					<div class='spinner-border text-light' role='status'>
						<span class='sr-only'>Loading...</span>
					</div>
				</div>
			)
		} else if (this.state.deviceState == 4) {
			return (
				<div
					style={{ backgroundColor: "#272b30", height: "100%" }}
					className='d-flex align-items-center justify-content-center'
				>
					<div>
						<form
							onSubmit={this.onSubmit}
							style={{ margin: "5px" }}
						>
							<div className='form-group'>
								<input
									name='deauthInput'
									onChange={this.handleInput}
									type='number'
									required
									placeholder='deauth'
									autoComplete='off'
								/>
							</div>
							<div className='form-group'>
								<input
									name='beaconInput'
									onChange={this.handleInput}
									type='number'
									required
									placeholder='beacon'
									autoComplete='off'
								/>
							</div>
							<div className='form-group'>
								<input
									name='probeInput'
									onChange={this.handleInput}
									type='number'
									required
									placeholder='probe'
									autoComplete='off'
								/>
							</div>

							<button className='btn-block btn-lg btn-success'>
								send value
							</button>
						</form>
						<CurrentValue />
					</div>
				</div>
			)
		} else if (this.state.deviceState === 5) {
			return (
				<div
					style={{ backgroundColor: "#272b30", height: "100%" }}
					className='d-flex align-items-center justify-content-center'
				>
					<CurrentAttack />
				</div>
			)
		}
	}
}

export default App
