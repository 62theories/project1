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
				<div>
					<button onClick={this.handleScanButton}>scan</button>
				</div>
			)
		} else if (this.state.deviceState === 2) {
			return (
				<div>
					<button type='button' onClick={this.startTraining}>
						start learning
					</button>
					<button type='button' onClick={this.handleCustomize}>
						use customize value
					</button>
				</div>
			)
		} else if (this.state.deviceState == 3) {
			return <div>Training</div>
		} else if (this.state.deviceState == 4) {
			return (
				<div>
					<CurrentValue />
					<form onSubmit={this.onSubmit}>
						<input
							name='deauthInput'
							onChange={this.handleInput}
							type='number'
							required
							placeholder='deauth'
						/>
						<input
							name='beaconInput'
							onChange={this.handleInput}
							type='number'
							required
							placeholder='beacon'
						/>
						<input
							name='probeInput'
							onChange={this.handleInput}
							type='number'
							required
							placeholder='probe'
						/>
						<button>send value</button>
					</form>
				</div>
			)
		} else if (this.state.deviceState === 5) {
			return (
				<div>
					<CurrentAttack />
				</div>
			)
		}
	}
}

export default App
