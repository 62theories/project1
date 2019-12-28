import React from "react"
export default class WiFiPassword extends React.Component {
	render() {
		return (
			<div
				style={{ backgroundColor: "#272b30", height: "100%" }}
				className='d-flex align-items-center justify-content-center'
			>
				<div>
					<form
						onSubmit={this.props.onSubmit}
						style={{ margin: "5px" }}
					>
						<div className='form-group'>
							<input
								name='ssid'
								onChange={this.props.handleInput}
								required
								placeholder='wifi name'
								autoComplete='off'
							/>
						</div>
						<div className='form-group'>
							<input
								name='password'
								onChange={this.props.handleInput}
								type='password'
								required
								placeholder='password'
								autoComplete='off'
							/>
						</div>

						<button className='btn-block btn-lg btn-success'>
							connect WiFi
						</button>
					</form>
				</div>
			</div>
		)
	}
}
