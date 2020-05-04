import React from "react"
import firebase from "./config/firebase"
import _ from "lodash"
import { mean, median, max } from "simple-statistics"

class Stat extends React.Component {
      state = {
            countArray: [],
      }
      componentDidMount = async () => {
            firebase
                  .database()
                  .ref("/deauth")
                  .on("value", (snapshot) => {
                        let countArray = _.values(snapshot.val()).map(
                              (item) => item.count
                        )
                        this.setState({ countArray })
                  })
      }
      render() {
            return (
                  <div className="container-fluid">
                        <div className="card mt-3">
                              <div className="card-body">
                                    <h3 className="text-center">
                                          Deauth Attack
                                    </h3>
                                    <div className="d-flex justify-content-center">
                                          <div
                                                className="row"
                                                style={{ width: "80%" }}
                                          >
                                                <div className="col-sm-4 text-center">
                                                      <div>
                                                            <h3>ค่าเฉลี่ย</h3>
                                                      </div>
                                                      <div>
                                                            <h4>
                                                                  {this.state
                                                                        .countArray
                                                                        .length >
                                                                  0
                                                                        ? mean(
                                                                                this
                                                                                      .state
                                                                                      .countArray
                                                                          ).toFixed(
                                                                                0
                                                                          )
                                                                        : ""}
                                                            </h4>
                                                      </div>
                                                      <div>
                                                            <h5>
                                                                  แพ็คเก็ต/นาที
                                                            </h5>
                                                      </div>
                                                </div>
                                                <div className="col-sm-4 text-center">
                                                      <div>
                                                            <h3>ค่ามัธยฐาน</h3>
                                                      </div>
                                                      <div>
                                                            <h4>
                                                                  {this.state
                                                                        .countArray
                                                                        .length >
                                                                  0
                                                                        ? median(
                                                                                this
                                                                                      .state
                                                                                      .countArray
                                                                          ).toFixed(
                                                                                0
                                                                          )
                                                                        : ""}
                                                            </h4>
                                                      </div>
                                                      <div>
                                                            <h5>
                                                                  แพ็คเก็ต/นาที
                                                            </h5>
                                                      </div>
                                                </div>
                                                <div className="col-sm-4 text-center">
                                                      <div>
                                                            <h3>ค่าสูงสุด</h3>
                                                      </div>
                                                      <div>
                                                            <h4>
                                                                  {this.state
                                                                        .countArray
                                                                        .length >
                                                                  0
                                                                        ? max(
                                                                                this
                                                                                      .state
                                                                                      .countArray
                                                                          ).toFixed(
                                                                                0
                                                                          )
                                                                        : ""}
                                                            </h4>
                                                      </div>
                                                      <div>
                                                            <h5>
                                                                  แพ็คเก็ต/นาที
                                                            </h5>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            )
      }
}

export default Stat
