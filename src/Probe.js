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
export default class Probe extends React.Component {
      state = {
            graphProbe: [],
            conditionProbe: false,
            attackNameProbe: "PROBE ATTACK",
            countProbe: 0,
            lastestProbe: "",
            handleInputProbe: ({ target }) => {
                  this.setState({
                        inputProbe: target.value
                  })
            },
            handleSubmitProbe: () => {
                  if (this.state.inputProbe > -1) {
                        this.setState({
                              specProbe: +this.state.inputProbe
                        })
                  } else {
                        this.setState({
                              conditionProbe: false,
                              countProbe: 0,
                              lastestProbe: ""
                        })
                  }
            },
            specProbe: 5,
            inputProbe: 5
      }
      componentDidMount = async () => {
            const stateRef = firebase.database().ref("time")
            stateRef.on("value", async snapshot => {
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countProbe: _.size(snapshot.val())
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionProbe: true
                                          })
                                    } else {
                                          this.setState({
                                                conditionProbe: false
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionProbe: false,
                                          countProbe: 0
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .limitToLast(5)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphProbe: _.values(
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
                                          graphProbe: []
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .limitToLast(1)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestProbe: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss")
                                    })
                              } else {
                                    this.setState({
                                          lastestProbe: ""
                                    })
                              }
                        })
            })
      }
      componentDidUpdate = (prevProps, prevState) => {
            if (prevState.specProbe !== this.state.specProbe) {
				  console.log('what')
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countProbe: _.size(snapshot.val())
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionProbe: true
                                          })
                                    } else {
                                          this.setState({
                                                conditionProbe: false
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionProbe: false,
                                          countProbe: 0
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .limitToLast(5)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphProbe: _.values(
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
                                          graphProbe: []
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/probe")
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .limitToLast(1)
                        .once("value", snapshot => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestProbe: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss")
                                    })
                              } else {
                                    this.setState({
                                          lastestProbe: ""
                                    })
                              }
                        })
            }
      }
      renderProbePage = () => (
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
                                                PROBE REQUEST ATTACK
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
                                                                              .graphProbe
                                                                  }
                                                                  condition={
                                                                        this
                                                                              .state
                                                                              .conditionProbe
                                                                  }
                                                                  attackName={
                                                                        this
                                                                              .state
                                                                              .attackNameProbe
                                                                  }
                                                                  count={
                                                                        this
                                                                              .state
                                                                              .countProbe
                                                                  }
                                                                  lastest={
                                                                        this
                                                                              .state
                                                                              .lastestProbe
                                                                  }
                                                                  handleInput={
                                                                        this
                                                                              .state
                                                                              .handleInputProbe
                                                                  }
                                                                  handleSubmit={
                                                                        this
                                                                              .state
                                                                              .handleSubmitProbe
                                                                  }
                                                                  spec={
                                                                        this
                                                                              .state
                                                                              .specProbe
                                                                  }
                                                                  input={
                                                                        this
                                                                              .state
                                                                              .inputProbe
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
            return <>{this.renderProbePage()}</>
      }
}
