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
				<div className='text-center'>
					<h4 className='text-light'>
						Lastest attck: {this.state.attackDetail}
					</h4>
				</div>
				{this.state.attackDetail === null ? null : (
					<h4 className='text-light'>At {`${new Date()}`}</h4>
				)}
			</div>
		)
	}
}

export default currentAttack
