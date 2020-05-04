import React from "react"
import {
      BarChart,
      Bar,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      Legend,
      ResponsiveContainer,
} from "recharts"
export default class Graph extends React.Component {
      render() {
            return (
                  <div className="d-flex align-items-center justify-content-center">
                        <div>
                              {this.props.condition ? (
                                    <div
                                          style={{
                                                height: "40vh",
                                                width: "50vw",
                                          }}
                                    >
                                          <ResponsiveContainer
                                                width="100%"
                                                height="100%"
                                          >
                                                <BarChart
                                                      data={this.props.graph}
                                                      margin={{
                                                            top: 5,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                      }}
                                                >
                                                      <CartesianGrid strokeDasharray="3 3" />
                                                      <XAxis dataKey="time" />
                                                      <YAxis />
                                                      <Tooltip />
                                                      <Legend />
                                                      <Bar
                                                            dataKey="count"
                                                            fill="#8884d8"
                                                      />
                                                </BarChart>
                                          </ResponsiveContainer>
                                    </div>
                              ) : (
                                    <div
                                          className="d-flex align-items-center justify-content-center"
                                          style={{
                                                height: "40vh",
                                                width: "50vw",
                                          }}
                                    >
                                          <div className="pt">
                                                <h1>
                                                      NO{" "}
                                                      {this.props.attackName +
                                                            " "}
                                                      FOUND
                                                </h1>
                                          </div>
                                    </div>
                              )}
                              <div className="d-flex align-items-center justify-content-center">
                                    <form
                                          className="form-inline"
                                          onSubmit={(e) => {
                                                e.preventDefault()
                                                this.props.handleSubmit()
                                          }}
                                    >
                                          <input
                                                name="probe"
                                                type="number"
                                                value={this.props.input}
                                                onChange={
                                                      this.props.handleInput
                                                }
                                                autoComplete="off"
                                                className="form-control ml-3"
                                                min="0"
                                                required
                                          />
                                          <button
                                                type="submit"
                                                className="btn btn-success ml-3"
                                          >
                                                DETECT
                                          </button>
                                    </form>
                              </div>

                              <div className="text-center mt-3">
                                    {this.props.attackName} FOUND:{" "}
                                    {this.props.count}
                              </div>
                              <div className="text-center mt-3">
                                    LASTEST ATTACK: {this.props.lastest}
                              </div>
                        </div>
                  </div>
            )
      }
}
