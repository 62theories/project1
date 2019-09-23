import React from "react"
import firebase from "./firebase"

class currentAttack extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			attackDetail: null
		}
	}

	componentDidMount() {
		const deauthRef = firebase.database().ref("Project/attack")
		deauthRef.on("value", snapshot => {
			let items = snapshot.val()
			// let newState = []
			// for (let item in items) {
			// 	newState.push({
			// 		item_id: item,
			// 		type: items[item],
			// 		time: new Date()
			// 	})
			// }
			// console.log(newState[0])
			this.setState({ attackDetail: items })
		})
	}

	render() {
		return (
			<div>
				<div>
					<span>
						lastest attck:{this.state.attackDetail} at{" "}
						{`${new Date()}`}
					</span>
				</div>
			</div>
		)
	}
}

export default currentAttack
