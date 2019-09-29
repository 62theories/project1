import React from "react"
import firebase from "./firebase"

class currentValue extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			deauthMax: 0,
			beaconMax: 0,
			probeMax: 0
		}
	}

	componentDidMount() {
		const deauthRef = firebase.database().ref("Project/deauthmax")
		deauthRef.on("value", snapshot => {
			let items = snapshot.val()
			// let newState = []
			// for (let item in items) {
			// 	newState.push({
			// 		item_id: item,
			// 		value: items[item]
			// 	})
			// }
			// console.log(newState[0].value)
			this.setState({ deauthMax: items })
		})
		const beanconRef = firebase.database().ref("Project/beaconmax")
		beanconRef.on("value", snapshot => {
			let items = snapshot.val()
			// let newState = []
			// for (let item in items) {
			// 	newState.push({
			// 		item_id: item,
			// 		value: items[item]
			// 	})
			// }
			// console.log(newState[0].value)
			this.setState({ beaconMax: items })
		})
		const probeRef = firebase.database().ref("Project/probemax")
		probeRef.on("value", snapshot => {
			let items = snapshot.val()
			// let newState = []
			// for (let item in items) {
			// 	newState.push({
			// 		item_id: item,
			// 		value: items[item]
			// 	})
			// }
			// console.log(newState[0].value)
			this.setState({ probeMax: items })
		})
	}

	render() {
		return (
			<div
				className='d-flex justify-content-center'
				style={{ marginTop: "20px" }}
			>
				<div>
					<div>
						<h5 className='text-light'>
							Max Deauth:{this.state.deauthMax}
						</h5>
					</div>
					<div>
						<h5 className='text-light'>
							Max beacon:{this.state.beaconMax}
						</h5>
					</div>
					<div>
						<h5 className='text-light'>
							Max probe:{this.state.probeMax}
						</h5>
					</div>
				</div>
			</div>
		)
	}
}

export default currentValue
