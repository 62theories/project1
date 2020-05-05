import React from "react"
import firebase from "./config/firebase"
import _ from "lodash"
import { mean, median, max } from "simple-statistics"
import StatCard from "./StatCard"
import PieChart from "./PieChart"

class Stat extends React.Component {
      state = {
            countDeauth: [],
            countProbe: [],
            countBeacon: [],
            timeAttackDeauth: [],
            timeAttackProbe: [],
            timeAttackBeacon: [],
      }
      componentDidMount = async () => {
            firebase
                  .database()
                  .ref("/deauth")
                  .on("value", (snapshot) => {
                        let countDeauth = _.values(snapshot.val()).map(
                              (item) => item.count
                        )
                        this.setState({ countDeauth })
                  })
            firebase
                  .database()
                  .ref("/probe")
                  .on("value", (snapshot) => {
                        let countProbe = _.values(snapshot.val()).map(
                              (item) => item.count
                        )
                        this.setState({ countProbe })
                  })
            firebase
                  .database()
                  .ref("/beacon")
                  .on("value", (snapshot) => {
                        let countBeacon = _.values(snapshot.val()).map(
                              (item) => item.count
                        )
                        this.setState({ countBeacon })
                  })
            firebase
                  .database()
                  .ref("/notification/deauth")
                  .on("value", (snapshot) => {
                        let timeAttackDeauth = _.values(snapshot.val()).map(
                              (item) => item
                        )
                        this.setState({ timeAttackDeauth })
                  })
            firebase
                  .database()
                  .ref("/notification/beacon")
                  .on("value", (snapshot) => {
                        let timeAttackBeacon = _.values(snapshot.val()).map(
                              (item) => item
                        )
                        this.setState({ timeAttackBeacon })
                  })
            firebase
                  .database()
                  .ref("/notification/probe")
                  .on("value", (snapshot) => {
                        let timeAttackProbe = _.values(snapshot.val()).map(
                              (item) => item
                        )
                        this.setState({ timeAttackProbe })
                  })
      }
      render() {
            return (
                  <div className="container-fluid">
                        <StatCard
                              name="Deauth Attack"
                              mean={
                                    this.state.countDeauth.length > 0
                                          ? mean(
                                                  this.state.countDeauth.filter(
                                                        (item) => item > 0
                                                  )
                                            ).toFixed(0)
                                          : 0
                              }
                              median={
                                    this.state.countDeauth.length > 0
                                          ? median(
                                                  this.state.countDeauth.filter(
                                                        (item) => item > 0
                                                  )
                                            ).toFixed(0)
                                          : 0
                              }
                              max={
                                    this.state.countDeauth.length > 0
                                          ? max(this.state.countDeauth).toFixed(
                                                  0
                                            )
                                          : 0
                              }
                        />
                        <StatCard
                              name="Probe Attack"
                              mean={
                                    this.state.countProbe.length > 0
                                          ? mean(
                                                  this.state.countProbe.filter(
                                                        (item) => item > 0
                                                  )
                                            ).toFixed(0)
                                          : 0
                              }
                              median={
                                    this.state.countProbe.length > 0
                                          ? median(
                                                  this.state.countProbe.filter(
                                                        (item) => item > 0
                                                  )
                                            ).toFixed(0)
                                          : 0
                              }
                              max={
                                    this.state.countProbe.length > 0
                                          ? max(this.state.countProbe).toFixed(
                                                  0
                                            )
                                          : 0
                              }
                        />
                        <StatCard
                              name="Beacon Attack"
                              mean={
                                    this.state.countBeacon.length > 0
                                          ? mean(
                                                  this.state.countBeacon.filter(
                                                        (item) => item > 0
                                                  )
                                            ).toFixed(0)
                                          : 0
                              }
                              median={
                                    this.state.countBeacon.length > 0
                                          ? median(
                                                  this.state.countBeacon.filter(
                                                        (item) => item > 0
                                                  )
                                            ).toFixed(0)
                                          : 0
                              }
                              max={
                                    this.state.countBeacon.length > 0
                                          ? max(this.state.countBeacon).toFixed(
                                                  0
                                            )
                                          : 0
                              }
                        />
                        <div className="card mt-3">
                              <div className="card-body">
                                    <h3 className="text-center">
                                          แจกแจงการโจมตีทั้ง 3 ประเภท
                                    </h3>
                                    <div className="d-flex justify-content-center">
                                          <div>
                                                <PieChart {...this.state} />
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div className="mt-3" style={{ visibility: "hidden" }}>
                              a
                        </div>
                  </div>
            )
      }
}

export default Stat
