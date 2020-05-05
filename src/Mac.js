import React from "react"
import firebase from "./config/firebase"
import _ from "lodash"

export default class Mac extends React.Component {
      state = {
            selectedMac: "",
            macList: [],
      }

      componentDidMount = () => {
            firebase
                  .database()
                  .ref("/mac")
                  .on("value", (snapshot) => {
                        if (snapshot.val()) {
                              let macList = []
                              _.forIn(snapshot.val(), (value, key) => {
                                    macList.push(key)
                              })
                              this.setState({ macList })
                        }
                  })
      }

      render() {
            return (
                  <div className="container-fluid" style={{ height: "100vh" }}>
                        <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ height: "100%" }}
                        >
                              <div>
                                    <h1>Select Device Below</h1>
                                    <select
                                          value={this.state.selectedMac}
                                          onChange={({ target: { value } }) => {
                                                this.setState({
                                                      selectedMac: value,
                                                })
                                                this.props.history.push(
                                                      `/device/${value}`
                                                )
                                          }}
                                          className="form-control"
                                    >
                                          <option value=""></option>
                                          {this.state.macList.map((mac) => (
                                                <option value={mac}>
                                                      {mac}
                                                </option>
                                          ))}
                                    </select>
                              </div>
                        </div>
                  </div>
            )
      }
}
