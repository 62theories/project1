import React from "react"
import firebase from "firebase"
import Card from "./Card"
import _ from "lodash"
import moment from "moment"

export default class DeviceResult extends React.Component {
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
            graphProbe: [],
            conditionProbe: false,
            attackNameProbe: "PROBE ATTACK",
            countProbe: 0,
            lastestProbe: "",
            handleInputProbe: ({ target }) => {
                  this.setState({
                        inputProbe: target.value,
                  })
            },
            handleSubmitProbe: () => {
                  if (this.state.inputProbe > -1) {
                        this.setState({
                              specProbe: +this.state.inputProbe,
                        })
                  } else {
                        this.setState({
                              conditionProbe: false,
                              countProbe: 0,
                              lastestProbe: "",
                        })
                  }
            },
            specProbe: 5,
            inputProbe: 5,
      }
      componentDidMount = async () => {
            const stateRef = firebase.database().ref("time")
            stateRef.on("value", async (snapshot) => {
                  firebase
                        .database()
                        .ref(`/mac/${this.props.match.params.id}/deauth`)
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
                        .ref(`/mac/${this.props.match.params.id}/deauth`)
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
                        .ref(`/mac/${this.props.match.params.id}/deauth`)
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
            stateRef.on("value", async (snapshot) => {
                  firebase
                        .database()
                        .ref(`/mac/${this.props.match.params.id}/probe`)
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countProbe: _.size(snapshot.val()),
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionProbe: true,
                                          })
                                    } else {
                                          this.setState({
                                                conditionProbe: false,
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionProbe: false,
                                          countProbe: 0,
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref(`/mac/${this.props.match.params.id}/probe`)
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .limitToLast(5)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphProbe: _.values(
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
                                          graphProbe: [],
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref(`/mac/${this.props.match.params.id}/probe`)
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .limitToLast(1)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestProbe: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss"),
                                    })
                              } else {
                                    this.setState({
                                          lastestProbe: "",
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
                        .ref(`/mac/${this.props.match.params.id}/deauth`)
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
                        .ref(`/mac/${this.props.match.params.id}/deauth`)
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
                        .ref(`/mac/${this.props.match.params.id}/deauth`)
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
            if (prevState.specProbe !== this.state.specProbe) {
                  console.log("what")
                  firebase
                        .database()
                        .ref(`/mac/${this.props.match.params.id}/probe`)
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          countProbe: _.size(snapshot.val()),
                                    })
                                    if (_.size(snapshot.val()) > 0) {
                                          this.setState({
                                                conditionProbe: true,
                                          })
                                    } else {
                                          this.setState({
                                                conditionProbe: false,
                                          })
                                    }
                              } else {
                                    this.setState({
                                          conditionProbe: false,
                                          countProbe: 0,
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref(`/mac/${this.props.match.params.id}/probe`)
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .limitToLast(5)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          graphProbe: _.values(
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
                                          graphProbe: [],
                                    })
                              }
                        })
                  firebase
                        .database()
                        .ref(`/mac/${this.props.match.params.id}/probe`)
                        .orderByChild("count")
                        .startAt(this.state.specProbe)
                        .limitToLast(1)
                        .once("value", (snapshot) => {
                              if (snapshot.val()) {
                                    this.setState({
                                          lastestProbe: moment(
                                                _.values(snapshot.val())[0].time
                                          ).format("DD/MM/YYYY hh:mm:ss"),
                                    })
                              } else {
                                    this.setState({
                                          lastestProbe: "",
                                    })
                              }
                        })
            }
      }
      render() {
            return (
                  <div
                        class="container-fluid"
                        style={{
                              height: "100%",
                              // backgroundColor: "#a8e6cf",
                        }}
                  >
                        <h3 className="text-center">
                              DEVICE: {this.props.match.params.id}
                        </h3>
                        <div
                              className="row flex-fill"
                              style={{ height: "100%" }}
                        >
                              <div className="col-sm-6 mt-3">
                                    <Card
                                          graph={this.state.graphDeauth}
                                          condition={this.state.conditionDeauth}
                                          attackName={
                                                this.state.attackNameDeauth
                                          }
                                          count={this.state.countDeauth}
                                          lastest={this.state.lastestDeauth}
                                          handleInput={
                                                this.state.handleInputDeauth
                                          }
                                          handleSubmit={
                                                this.state.handleSubmitDeauth
                                          }
                                          spec={this.state.specDeauth}
                                          input={this.state.inputDeauth}
                                    />
                              </div>
                              <div className="col-sm-6 mt-3">
                                    <Card
                                          graph={this.state.graphProbe}
                                          condition={this.state.conditionProbe}
                                          attackName={
                                                this.state.attackNameProbe
                                          }
                                          count={this.state.countProbe}
                                          lastest={this.state.lastestProbe}
                                          handleInput={
                                                this.state.handleInputProbe
                                          }
                                          handleSubmit={
                                                this.state.handleSubmitProbe
                                          }
                                          spec={this.state.specProbe}
                                          input={this.state.inputProbe}
                                    />
                              </div>
                        </div>
                  </div>
            )
      }
}
