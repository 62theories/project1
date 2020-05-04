import React from "react"
import firebase from "./config/firebase"
export default class Line extends React.Component {
      state = {
            deauthMax: 0,
            probeMax: 0,
            beaconMax: 0,
            showForm: false,
      }
      componentDidMount = async () => {
            const stateRef = firebase.database().ref("alert/deauth")
            stateRef.once("value", async (snapshot) => {
                  this.setState({
                        deauthMax: snapshot.val(),
                  })
            })
            const stateRef2 = firebase.database().ref("alert/probe")
            stateRef2.once("value", async (snapshot) => {
                  this.setState({
                        probeMax: snapshot.val(),
                  })
            })
            const stateRef3 = firebase.database().ref("alert/beacon")
            stateRef3.once("value", async (snapshot) => {
                  this.setState({
                        beaconMax: snapshot.val(),
                  })
            })
      }

      render() {
            return (
                  <div
                        class="card bg-transparent border-0"
                        style={{ backgroundColor: "aliceblue" }}
                  >
                        <div class="card-body pt-0 pt-md-4">
                              <div className="text-center">
                                    <h2>SCAN QR CODE BELOW</h2>
                              </div>
                              <div className="d-flex align-items-center justify-content-center">
                                    <div>
                                          <img
                                                src={require("./line_qr.jpg")}
                                                className="img-fluid"
                                          />
                                          {this.state.showForm ? (
                                                <form
                                                      onSubmit={(e) => {
                                                            e.preventDefault()
                                                            const stateRef = firebase
                                                                  .database()
                                                                  .ref(
                                                                        "alert/deauth"
                                                                  )
                                                            stateRef.set(
                                                                  parseInt(
                                                                        this
                                                                              .state
                                                                              .deauthMax
                                                                  )
                                                            )
                                                            const stateRef2 = firebase
                                                                  .database()
                                                                  .ref(
                                                                        "alert/probe"
                                                                  )
                                                            stateRef2.set(
                                                                  +this.state
                                                                        .probeMax
                                                            )
                                                            const stateRef3 = firebase
                                                                  .database()
                                                                  .ref(
                                                                        "alert/beacon"
                                                                  )
                                                            stateRef3.set(
                                                                  +this.state
                                                                        .beaconMax
                                                            )
                                                            this.setState({
                                                                  showForm: false,
                                                            })
                                                      }}
                                                >
                                                      <div class="form-group row">
                                                            <label
                                                                  for="inputPassword"
                                                                  class="col-sm-4 col-form-label"
                                                            >
                                                                  Deauth Count
                                                            </label>
                                                            <div class="col-sm-8">
                                                                  <input
                                                                        name="deauthMax"
                                                                        onChange={({
                                                                              target: {
                                                                                    name,
                                                                                    value,
                                                                              },
                                                                        }) => {
                                                                              this.setState(
                                                                                    {
                                                                                          [name]: value,
                                                                                    }
                                                                              )
                                                                        }}
                                                                        type="number"
                                                                        class="form-control"
                                                                        id="inputPassword"
                                                                        value={
                                                                              this
                                                                                    .state
                                                                                    .deauthMax
                                                                        }
                                                                  />
                                                            </div>
                                                      </div>
                                                      <div class="form-group row">
                                                            <label
                                                                  for="inputPassword"
                                                                  class="col-sm-4 col-form-label"
                                                            >
                                                                  Probe Count
                                                            </label>
                                                            <div class="col-sm-8">
                                                                  <input
                                                                        name="probeMax"
                                                                        onChange={({
                                                                              target: {
                                                                                    name,
                                                                                    value,
                                                                              },
                                                                        }) => {
                                                                              this.setState(
                                                                                    {
                                                                                          [name]: value,
                                                                                    }
                                                                              )
                                                                        }}
                                                                        type="number"
                                                                        class="form-control"
                                                                        id="inputPassword"
                                                                        value={
                                                                              this
                                                                                    .state
                                                                                    .probeMax
                                                                        }
                                                                  />
                                                            </div>
                                                      </div>{" "}
                                                      <div class="form-group row">
                                                            <label
                                                                  for="inputPassword"
                                                                  class="col-sm-4 col-form-label"
                                                            >
                                                                  Beacon Count
                                                            </label>
                                                            <div class="col-sm-8">
                                                                  <input
                                                                        name="beaconMax"
                                                                        onChange={({
                                                                              target: {
                                                                                    name,
                                                                                    value,
                                                                              },
                                                                        }) => {
                                                                              this.setState(
                                                                                    {
                                                                                          [name]: value,
                                                                                    }
                                                                              )
                                                                        }}
                                                                        type="number"
                                                                        class="form-control"
                                                                        id="inputPassword"
                                                                        value={
                                                                              this
                                                                                    .state
                                                                                    .beaconMax
                                                                        }
                                                                  />
                                                            </div>
                                                      </div>
                                                      <div className="d-flex align-items-center justify-content-center">
                                                            <button
                                                                  type="submit"
                                                                  class="btn btn-success"
                                                            >
                                                                  Confirm
                                                            </button>
                                                      </div>
                                                </form>
                                          ) : (
                                                <div className="d-flex align-items-center justify-content-center mt-3">
                                                      <button
                                                            type="button"
                                                            class="btn btn-success"
                                                            onClick={() =>
                                                                  this.setState(
                                                                        {
                                                                              showForm: true,
                                                                        }
                                                                  )
                                                            }
                                                      >
                                                            Edit Detection
                                                      </button>
                                                </div>
                                          )}
                                    </div>
                              </div>
                        </div>
                  </div>
            )
      }
}
