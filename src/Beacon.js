import React from "react"
import firebase from "./components/firebase.js"
import {
      BarChart,
      Bar,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      Legend,
      ResponsiveContainer
} from "recharts"
import moment from "moment"
import _ from "lodash"
import { Link } from "react-router-dom"
import "./assets/css/argon-dashboard.css"
import Graph from "./Graph"
export default class Beacon extends React.Component {
      state = {
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
            if (prevState.specBeacon !== this.state.specBeacon) {
				  console.log('what')
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
      renderBeaconPage = () => (
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
                                                BEACON FLOODING ATTACK
                                          </h1>
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
            return <>{this.renderBeaconPage()}</>
      }
}
