import React from "react"
import firebase from "./components/firebase.js"
import _ from "lodash"
import "./assets/css/argon-dashboard.css"
export default class Deauth extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			isLoading: true
		}
	}

	componentDidMount = async () => {
		const stateRef = firebase.database().ref("MAC")
		stateRef.on("value", async snapshot => {
			this.setState({
				list: _.keys(snapshot.val())
			})
			if (this.state.isLoading) {
				this.setState({ isLoading: false })
			}
		})
	}

	render() {
		return (
			<>
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
									<h1 class='display-2 text-white'>DEVICE MONITOR</h1>
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
												{this.state.isLoading ?
													<h1>LOADING...</h1>
													:
													(
														<>
															<h1>SELECT DEVICE BELOW</h1>
															<div class="list-group">
																{this.state.list.map((item,key) => (
																	<button type="button" key={key} class="list-group-item list-group-item-action" onClick={() => this.props.history.push(`/attack/${item}`)}><strong>{item}</strong></button>
																))}
															</div>
														</>
													)
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<footer class='footer'></footer>
					</div>
				</div>
			</>
		)
	}
}
