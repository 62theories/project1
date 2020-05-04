import React from "react"
import firebase from "./config/firebase"
import Card from "./Card"
import _ from "lodash"
import moment from "moment"

export default class Beacon extends React.Component {
      state = {
            graphBeacon: [],
            conditionBeacon: false,
            attackNameBeacon: "BEACON ATTACK",
            countBeacon: 0,
            lastestBeacon: "",
            handleInputBeacon: ({ target }) => {
                  this.setState({
                        inputBeacon: target.value,
                  })
            },
            handleSubmitBeacon: () => {
                  if (this.state.inputBeacon > -1) {
                        this.setState({
                              specBeacon: +this.state.inputBeacon,
                        })
                  } else {
                        this.setState({
                              conditionBeacon: false,
                              countBeacon: 0,
                              lastestBeacon: "",
                        })
                  }
            },
            specBeacon: 5,
            inputBeacon: 5,
      }
      componentDidMount = async () => {
            const stateRef = firebase.database().ref("time")
            stateRef.on("value", async (snapshot) => {
                  firebase
                        .database()
                        .ref("/beacon")
                        .orderByChild("count")
                        .startAt(this.state.specBeacon)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countBeacon: _.size(snapshot.val()),
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionBeacon: true,
                                          })
                                    } else {
                                          this.setState({
                                                conditionBeacon: false,
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionBeacon: false,
                                          countBeacon: 0,
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/beacon")
                        .orderByChild("count")
                        .startAt(this.state.specBeacon)
                        .limitToLast(5)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphBeacon: _.values(
                                                snapshot.val()
                                          ).map((item) => {
                                                return {
                                                      ...item,
                                                      time: moment(
                                                            item.time
                                                      ).format("DD/MM hh:mm"),
                                                }
                                          }),
                                    })
                              } else {
                                    this.setState({
                                          graphBeacon: [],
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/beacon")
                        .orderByChild("count")
                        .startAt(this.state.specBeacon)
                        .limitToLast(1)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestBeacon: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss"),
                                    })
                              } else {
                                    this.setState({
                                          lastestBeacon: "",
                                    })
                              }
                        })
            })
      }
      componentDidUpdate = (prevProps, prevState) => {
            if (prevState.specBeacon !== this.state.specBeacon) {
                  console.log("what")
                  firebase
                        .database()
                        .ref("/beacon")
                        .orderByChild("count")
                        .startAt(this.state.specBeacon)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countBeacon: _.size(snapshot.val()),
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionBeacon: true,
                                          })
                                    } else {
                                          this.setState({
                                                conditionBeacon: false,
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionBeacon: false,
                                          countBeacon: 0,
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/beacon")
                        .orderByChild("count")
                        .startAt(this.state.specBeacon)
                        .limitToLast(5)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphBeacon: _.values(
                                                snapshot.val()
                                          ).map((item) => {
                                                return {
                                                      ...item,
                                                      time: moment(
                                                            item.time
                                                      ).format("DD/MM hh:mm"),
                                                }
                                          }),
                                    })
                              } else {
                                    this.setState({
                                          graphBeacon: [],
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/beacon")
                        .orderByChild("count")
                        .startAt(this.state.specBeacon)
                        .limitToLast(1)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestBeacon: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss"),
                                    })
                              } else {
                                    this.setState({
                                          lastestBeacon: "",
                                    })
                              }
                        })
            }
      }
      render() {
            return (
                  <Card
                        graph={this.state.graphBeacon}
                        condition={this.state.conditionBeacon}
                        attackName={this.state.attackNameBeacon}
                        count={this.state.countBeacon}
                        lastest={this.state.lastestBeacon}
                        handleInput={this.state.handleInputBeacon}
                        handleSubmit={this.state.handleSubmitBeacon}
                        spec={this.state.specBeacon}
                        input={this.state.inputBeacon}
                  />
            )
      }
}
