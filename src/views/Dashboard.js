import React from "react"
import "../assets/css/argon-dashboard.css"
export default class Dashboard extends React.Component {
	render() {
		return (
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
										<div class='card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4'></div>
										<div class='card-body pt-0 pt-md-4'>
											{this.props.renderProbe()}
										</div>
									</div>
									<div class='card card-profile shadow mt-4'>
										<div class='card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4'></div>
										<div class='card-body pt-0 pt-md-4'>
											{this.props.renderDeauth()}
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
	}
}
