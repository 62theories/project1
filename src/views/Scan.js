import React from "react"
export default class Scan extends React.Component {
	render() {
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
						onClick={this.props.handleScanButton}
						className='btn btn-success btn-lg'
					>
						scan for your device
					</button>
				</div>
			</div>
		)
	}
}
