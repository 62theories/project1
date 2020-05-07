import React from "react"
import CountUp from "react-countup"

export default class StatCard extends React.Component {
      render() {
            return (
                  <div className="card mt-3">
                        <div className="card-body">
                              <h3 className="text-center">{this.props.name}</h3>
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
                                                            <CountUp
                                                                  separator=","
                                                                  end={
                                                                        this
                                                                              .props
                                                                              .mean
                                                                  }
                                                            />
                                                      </h4>
                                                </div>
                                                <div>
                                                      <h5>แพ็คเก็ต/นาที</h5>
                                                </div>
                                          </div>
                                          <div className="col-sm-4 text-center">
                                                <div>
                                                      <h3>ค่ามัธยฐาน</h3>
                                                </div>
                                                <div>
                                                      <h4>
                                                            <CountUp
                                                                  separator=","
                                                                  end={
                                                                        this
                                                                              .props
                                                                              .median
                                                                  }
                                                            />
                                                      </h4>
                                                </div>
                                                <div>
                                                      <h5>แพ็คเก็ต/นาที</h5>
                                                </div>
                                          </div>
                                          <div className="col-sm-4 text-center">
                                                <div>
                                                      <h3>ค่าสูงสุด</h3>
                                                </div>
                                                <div>
                                                      <h4>
                                                            <CountUp
                                                                  separator=","
                                                                  end={
                                                                        this
                                                                              .props
                                                                              .max
                                                                  }
                                                            />
                                                      </h4>
                                                </div>
                                                <div>
                                                      <h5>แพ็คเก็ต/นาที</h5>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            )
      }
}
