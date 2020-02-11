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
export default class Deauth extends React.Component {
      state = {
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
            inputDeauth: 5
      }
      componentDidMount = async () => {
            const stateRef = firebase.database().ref("time")
            stateRef.on("value", async snapshot => {
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
            })
      }
      componentDidUpdate = (prevProps, prevState) => {
            if (prevState.specDeauth !== this.state.specDeauth) {
				  console.log('what')
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
            }
      }
      renderDeauthPage = () => (
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
                                                DEAUTHENTICATION ATTACK
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
                                    </div>
                              </div>
                        </div>

                        <footer class="footer"></footer>
                  </div>
            </div>
      )

      render() {
            return <>{this.renderDeauthPage()}</>
      }
}
