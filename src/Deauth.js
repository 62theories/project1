import React from "react"
import firebase from "./config/firebase"
import Card from "./Card"
import _ from "lodash"
import moment from "moment"

export default class Deauth extends React.Component {
      state = {
            graphDeauth: [],
            conditionDeauth: false,
            attackNameDeauth: "DEAUTH ATTACK",
            countDeauth: 0,
            lastestDeauth: "",
            handleInputDeauth: ({ target }) => {
                  this.setState({
                        inputDeauth: target.value,
                  })
            },
            handleSubmitDeauth: () => {
                  if (this.state.inputDeauth > -1) {
                        this.setState({
                              specDeauth: +this.state.inputDeauth,
                        })
                  } else {
                        this.setState({
                              conditionDeauth: false,
                              countDeauth: 0,
                              lastestDeauth: "",
                        })
                  }
            },
            specDeauth: 5,
            inputDeauth: 5,
      }
      componentDidMount = async () => {
            const stateRef = firebase.database().ref("time")
            stateRef.on("value", async (snapshot) => {
                  firebase
                        .database()
                        .ref("/deauth")
                        .orderByChild("count")
                        .startAt(this.state.specDeauth)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countDeauth: _.size(snapshot.val()),
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionDeauth: true,
                                          })
                                    } else {
                                          this.setState({
                                                conditionDeauth: false,
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionDeauth: false,
                                          countDeauth: 0,
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/deauth")
                        .orderByChild("count")
                        .startAt(this.state.specDeauth)
                        .limitToLast(5)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphDeauth: _.values(
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
                                          graphDeauth: [],
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/deauth")
                        .orderByChild("count")
                        .startAt(this.state.specDeauth)
                        .limitToLast(1)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestDeauth: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm"),
                                    })
                              } else {
                                    this.setState({
                                          lastestDeauth: "",
                                    })
                              }
                        })
            })
      }
      componentDidUpdate = (prevProps, prevState) => {
            if (prevState.specDeauth !== this.state.specDeauth) {
                  console.log("what")
                  firebase
                        .database()
                        .ref("/deauth")
                        .orderByChild("count")
                        .startAt(this.state.specDeauth)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countDeauth: _.size(snapshot.val()),
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionDeauth: true,
                                          })
                                    } else {
                                          this.setState({
                                                conditionDeauth: false,
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionDeauth: false,
                                          countDeauth: 0,
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/deauth")
                        .orderByChild("count")
                        .startAt(this.state.specDeauth)
                        .limitToLast(5)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphDeauth: _.values(
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
                                          graphDeauth: [],
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref("/deauth")
                        .orderByChild("count")
                        .startAt(this.state.specDeauth)
                        .limitToLast(1)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestDeauth: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss"),
                                    })
                              } else {
                                    this.setState({
                                          lastestDeauth: "",
                                    })
                              }
                        })
            }
      }
      render() {
            return (
                  <Card
                        graph={this.state.graphDeauth}
                        condition={this.state.conditionDeauth}
                        attackName={this.state.attackNameDeauth}
                        count={this.state.countDeauth}
                        lastest={this.state.lastestDeauth}
                        handleInput={this.state.handleInputDeauth}
                        handleSubmit={this.state.handleSubmitDeauth}
                        spec={this.state.specDeauth}
                        input={this.state.inputDeauth}
                  />
            )
      }
}
