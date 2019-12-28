import React from "react"

export default class Loading extends React.Component {
	render() {
		return (
			<div
				style={{ backgroundColor: "#272b30", height: "100%" }}
				className='d-flex align-items-center justify-content-center'
			>
				<div class='spinner-border text-light' role='status'>
					<span class='sr-only'>Loading...</span>
				</div>
			</div>
		)
	}
}
