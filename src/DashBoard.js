import React from "react"
import firebase from "./components/firebase.js"
import moment from "moment"
import _ from "lodash"
import Graph from "./Graph"
import "./assets/css/argon-dashboard.css"
export default class DashBoard extends React.Component {
      state = {
            graph: [],
            condition: false,
            attackName: "PROBE ATTACK",
            count: 0,
            lastest: "",
            handleInput: ({ target }) => {
                  this.setState({
                        input: target.value
                  })
            },
            handleSubmit: () => {
                  if (this.state.input > -1) {
                        this.setState({
                              spec: +this.state.input
                        })
                  } else {
                        this.setState({
                              condition: false,
                              count: 0,
                              lastest: ""
                        })
                  }
            },
            spec: 5,
            input: 5,
            graphDeauth: [],
            conditionDeauth: false,
            attackNameDeauth: "DEAUTH ATTACK",
            countDeauth: 0,
            lastestDeauth: "",
            handleInputDeauth: ({ target }) => {
                  this.setState({
                        inputDeauth: target.value
                  })
            },
            handleSubmitDeauth: () => {
                  if (this.state.inputDeauth > -1) {
                        this.setState({
                              specDeauth: +this.state.inputDeauth
                        })
                  } else {
                        this.setState({
                              conditionDeauth: false,
                              countDeauth: 0,
                              lastestDeauth: ""
                        })
                  }
            },
            specDeauth: 5,
			inputDeauth: 5,
			///
			graphBeacon: [],
            conditionBeacon: false,
            attackNameBeacon: "BEACON ATTACK",
            countBeacon: 0,
            lastestBeacon: "",
            handleInputBeacon: ({ target }) => {
                  this.setState({
                        inputBeacon: target.value
                  })
            },
            handleSubmitBeacon: () => {
                  if (this.state.inputBeacon > -1) {
                        this.setState({
                              specBeacon: +this.state.inputBeacon
                        })
                  } else {
                        this.setState({
                              conditionBeacon: false,
                              countBeacon: 0,
                              lastestBeacon: ""
                        })
                  }
            },
            specBeacon: 5,
            inputBeacon: 5
      }

      componentDidMount = async () => {
            const stateRef = firebase.database().ref("time")
            stateRef.on("value", async snapshot => {
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.spec)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          count: _.size(snapshot.val())
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                condition: true
                                          })
                                    } else {
                                          this.setState({
                                                condition: false
                                          })
                                    }
                              } else {
                                    this.setState({
                                          condition: false,
                                          count: 0
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.spec)
                        .limitToLast(5)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graph: _.values(snapshot.val()).map(
                                                item => {
                                                      return {
                                                            ...item,
                                                            time: moment(
                                                                  item.time
                                                            ).format(
                                                                  "DD/MM hh:mm"
                                                            )
                                                      }
                                                }
                                          )
                                    })
                              } else {
                                    this.setState({
                                          graph: []
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.spec)
                        .limitToLast(1)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastest: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss")
                                    })
                              } else {
                                    this.setState({
                                          lastest: ""
                                    })
                              }
                        })
                  //////////
                  firebase
                        .database()
                        .ref("/deauth")
                        .orderByChild("count")
                        .startAt(this.state.specDeauth)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countDeauth: _.size(snapshot.val())
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionDeauth: true
                                          })
                                    } else {
                                          this.setState({
                                                conditionDeauth: false
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionDeauth: false,
                                          countDeauth: 0
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/deauth")
                        .orderByChild("count")
                        .startAt(this.state.specDeauth)
                        .limitToLast(5)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphDeauth: _.values(
                                                snapshot.val()
                                          ).map(item => {
                                                return {
                                                      ...item,
                                                      time: moment(
                                                            item.time
                                                      ).format("DD/MM hh:mm")
                                                }
                                          })
                                    })
                              } else {
                                    this.setState({
                                          graphDeauth: []
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/deauth")
                        .orderByChild("count")
                        .startAt(this.state.specDeauth)
                        .limitToLast(1)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestDeauth: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss")
                                    })
                              } else {
                                    this.setState({
                                          lastestDeauth: ""
                                    })
                              }
						})
					///////
					firebase
                        .database()
                        .ref("/beacon")
                        .orderByChild("count")
                        .startAt(this.state.specBeacon)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countBeacon: _.size(snapshot.val())
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionBeacon: true
                                          })
                                    } else {
                                          this.setState({
                                                conditionBeacon: false
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionBeacon: false,
                                          countBeacon: 0
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/beacon")
                        .orderByChild("count")
                        .startAt(this.state.specBeacon)
                        .limitToLast(5)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphBeacon: _.values(
                                                snapshot.val()
                                          ).map(item => {
                                                return {
                                                      ...item,
                                                      time: moment(
                                                            item.time
                                                      ).format("DD/MM hh:mm")
                                                }
                                          })
                                    })
                              } else {
                                    this.setState({
                                          graphBeacon: []
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/beacon")
                        .orderByChild("count")
                        .startAt(this.state.specBeacon)
                        .limitToLast(1)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestBeacon: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss")
                                    })
                              } else {
                                    this.setState({
                                          lastestBeacon: ""
                                    })
                              }
						})
            })
      }

      componentDidUpdate = (prevProps, prevState) => {
            if (prevState.spec !== this.state.spec) {
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.spec)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          count: _.size(snapshot.val())
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                condition: true
                                          })
                                    } else {
                                          this.setState({
                                                condition: false
                                          })
                                    }
                              } else {
                                    this.setState({
                                          condition: false,
                                          count: 0
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.spec)
                        .limitToLast(5)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graph: _.values(snapshot.val()).map(
                                                item => {
                                                      return {
                                                            ...item,
                                                            time: moment(
                                                                  item.time
                                                            ).format(
                                                                  "DD/MM hh:mm"
                                                            )
                                                      }
                                                }
                                          )
                                    })
                              } else {
                                    this.setState({
                                          graph: []
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.spec)
                        .limitToLast(1)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastest: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss")
                                    })
                              } else {
                                    this.setState({
                                          lastest: ""
                                    })
                              }
                        })
            } else if (prevState.specDeauth !== this.state.specDeauth) {
                  firebase
                        .database()
                        .ref("/deauth")
                        .orderByChild("count")
                        .startAt(this.state.specDeauth)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countDeauth: _.size(snapshot.val())
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionDeauth: true
                                          })
                                    } else {
                                          this.setState({
                                                conditionDeauth: false
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionDeauth: false,
                                          countDeauth: 0
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/deauth")
                        .orderByChild("count")
                        .startAt(this.state.specDeauth)
                        .limitToLast(5)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphDeauth: _.values(
                                                snapshot.val()
                                          ).map(item => {
                                                return {
                                                      ...item,
                                                      time: moment(
                                                            item.time
                                                      ).format("DD/MM hh:mm")
                                                }
                                          })
                                    })
                              } else {
                                    this.setState({
                                          graphDeauth: []
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/deauth")
                        .orderByChild("count")
                        .startAt(this.state.specDeauth)
                        .limitToLast(1)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestDeauth: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss")
                                    })
                              } else {
                                    this.setState({
                                          lastestDeauth: ""
                                    })
                              }
                        })
            } else if (prevState.specBeacon !== this.state.specBeacon) {
				firebase
                        .database()
                        .ref("/beacon")
                        .orderByChild("count")
                        .startAt(this.state.specBeacon)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countBeacon: _.size(snapshot.val())
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionBeacon: true
                                          })
                                    } else {
                                          this.setState({
                                                conditionBeacon: false
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionBeacon: false,
                                          countBeacon: 0
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/beacon")
                        .orderByChild("count")
                        .startAt(this.state.specBeacon)
                        .limitToLast(5)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphBeacon: _.values(
                                                snapshot.val()
                                          ).map(item => {
                                                return {
                                                      ...item,
                                                      time: moment(
                                                            item.time
                                                      ).format("DD/MM hh:mm")
                                                }
                                          })
                                    })
                              } else {
                                    this.setState({
                                          graphBeacon: []
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/beacon")
                        .orderByChild("count")
                        .startAt(this.state.specBeacon)
                        .limitToLast(1)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestBeacon: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss")
                                    })
                              } else {
                                    this.setState({
                                          lastestBeacon: ""
                                    })
                              }
						})
			}
      }

      renderDashboard = () => (
            <div class="main-content">
                  <div
                        class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                        style={{
                              "min-height": "600px",
                              "background-size": "cover",
                              "background-position": "center top"
                        }}
                  >
                        <span class="mask bg-gradient-default opacity-8"></span>
                        <div class="container-fluid d-flex align-items-center">
                              <div class="row">
                                    <div class="col-lg-12 col-md-10">
                                          <h1 class="display-2 text-white">
                                                WIFI ATTACK DETECTOR
                                          </h1>
                                          <p class="text-white mt-0 mb-5">
                                                Real-time monitoring WiFi
                                                Network and attacks detection
                                                using NodeMCU and Firebase.
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div class="container-fluid mt--7">
                        <div class="row">
                              <div class="container-fluid mt--7">
                                    <div class="row">
									<div class="col-xl-12 order-xl-2 mb-5 mb-xl-0">
                                                <div class="card card-profile shadow mt-4">
                                                      <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></div>
                                                      <div class="card-body pt-0 pt-md-4">
                                                            <Graph
                                                                  graph={
                                                                        this
                                                                              .state
                                                                              .graphDeauth
                                                                  }
                                                                  condition={
                                                                        this
                                                                              .state
                                                                              .conditionDeauth
                                                                  }
                                                                  attackName={
                                                                        this
                                                                              .state
                                                                              .attackNameDeauth
                                                                  }
                                                                  count={
                                                                        this
                                                                              .state
                                                                              .countDeauth
                                                                  }
                                                                  lastest={
                                                                        this
                                                                              .state
                                                                              .lastestDeauth
                                                                  }
                                                                  handleInput={
                                                                        this
                                                                              .state
                                                                              .handleInputDeauth
                                                                  }
                                                                  handleSubmit={
                                                                        this
                                                                              .state
                                                                              .handleSubmitDeauth
                                                                  }
                                                                  spec={
                                                                        this
                                                                              .state
                                                                              .specDeauth
                                                                  }
                                                                  input={
                                                                        this
                                                                              .state
                                                                              .inputDeauth
                                                                  }
                                                            />
                                                      </div>
                                                </div>
                                          </div>
                                          <div class="col-xl-12 order-xl-2 mb-5 mb-xl-0">
                                                <div class="card card-profile shadow mt-4">
                                                      <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></div>
                                                      <div class="card-body pt-0 pt-md-4">
                                                            <Graph
                                                                  graph={
                                                                        this
                                                                              .state
                                                                              .graph
                                                                  }
                                                                  condition={
                                                                        this
                                                                              .state
                                                                              .condition
                                                                  }
                                                                  attackName={
                                                                        this
                                                                              .state
                                                                              .attackName
                                                                  }
                                                                  count={
                                                                        this
                                                                              .state
                                                                              .count
                                                                  }
                                                                  lastest={
                                                                        this
                                                                              .state
                                                                              .lastest
                                                                  }
                                                                  handleInput={
                                                                        this
                                                                              .state
                                                                              .handleInput
                                                                  }
                                                                  handleSubmit={
                                                                        this
                                                                              .state
                                                                              .handleSubmit
                                                                  }
                                                                  spec={
                                                                        this
                                                                              .state
                                                                              .spec
                                                                  }
                                                                  input={
                                                                        this
                                                                              .state
                                                                              .input
                                                                  }
                                                            />
                                                      </div>
                                                </div>
                                          </div>
										  <div class="col-xl-12 order-xl-2 mb-5 mb-xl-0">
                                                <div class="card card-profile shadow mt-4">
                                                      <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></div>
                                                      <div class="card-body pt-0 pt-md-4">
                                                            <Graph
                                                                  graph={
                                                                        this
                                                                              .state
                                                                              .graphBeacon
                                                                  }
                                                                  condition={
                                                                        this
                                                                              .state
                                                                              .conditionBeacon
                                                                  }
                                                                  attackName={
                                                                        this
                                                                              .state
                                                                              .attackNameBeacon
                                                                  }
                                                                  count={
                                                                        this
                                                                              .state
                                                                              .countBeacon
                                                                  }
                                                                  lastest={
                                                                        this
                                                                              .state
                                                                              .lastestBeacon
                                                                  }
                                                                  handleInput={
                                                                        this
                                                                              .state
                                                                              .handleInputBeacon
                                                                  }
                                                                  handleSubmit={
                                                                        this
                                                                              .state
                                                                              .handleSubmitBeacon
                                                                  }
                                                                  spec={
                                                                        this
                                                                              .state
                                                                              .specBeacon
                                                                  }
                                                                  input={
                                                                        this
                                                                              .state
                                                                              .inputBeacon
                                                                  }
                                                            />
                                                      </div>
                                                </div>
                                          </div>
										 
                                    </div>
                              </div>
                        </div>

                        <footer class="footer"></footer>
                  </div>
            </div>
      )

      render() {
            return <>{this.renderDashboard()}</>
      }
}
