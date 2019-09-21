import React from "react"

class App extends React.Component {
	state = {
		bluetoothDevice: null,
		server: null
	}

	handleScanButton = async e => {
		e.preventDefault()
		await this.setState({
			bluetoothDevice: navigator.bluetooth.requestDevice({
				acceptAllDevices: ["true"],
				optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"]
			})
		})
	}

	connectToDevice = () => {
		this.setState({
			server: this.state.gatt.connect()
		})
	}

	render() {
		return (
			<div>
				<button onClick={this.handleScanButton}>scan</button>
				<br />
				<br />
				<form>
					<input id='deauth' type='text' placeholder='deauth' />
					<input id='beacon' type='text' placeholder='beacon' />
					<input id='probe' type='text' placeholder='probe' />
					<button>send value</button>
				</form>

				<button type='button' onclick='a()'>
					training
				</button>
			</div>
		)
	}
}

export default App
