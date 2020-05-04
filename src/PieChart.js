import React from "react"
import _ from "lodash"
import {
      PieChart,
      Pie,
      Tooltip,
      Legend,
      Cell,
      ResponsiveContainer,
} from "recharts"

export default class Chart extends React.Component {
      render() {
            let pieData = []
            let sumDeauth = _.sum(
                  this.props.timeAttackDeauth.map((item) => item.count)
            )
            let sumProbe = _.sum(
                  this.props.timeAttackProbe.map((item) => item.count)
            )
            let sumBeacon = _.sum(
                  this.props.timeAttackBeacon.map((item) => item.count)
            )
            if (sumDeauth > 0) {
                  pieData.push({
                        name: "deauth",
                        value: sumDeauth,
                  })
            }
            if (sumProbe > 0) {
                  pieData.push({
                        name: "probe",
                        value: sumProbe,
                  })
            }
            if (sumBeacon > 0) {
                  pieData.push({
                        name: "beacon",
                        value: sumBeacon,
                  })
            }
            const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]
            return (
                  <>
                        <ResponsiveContainer width={400} height={400}>
                              <PieChart width="100%" height="100%">
                                    <Pie
                                          data={pieData}
                                          cx={200}
                                          cy={200}
                                          outerRadius={80}
                                          fill="#8884d8"
                                          dataKey="value"
                                    >
                                          {pieData.map((entry, index) => {
                                                if (entry.name === "deauth") {
                                                      return (
                                                            <Cell
                                                                  fill={
                                                                        COLORS[0]
                                                                  }
                                                            />
                                                      )
                                                } else if (
                                                      entry.name === "probe"
                                                ) {
                                                      return (
                                                            <Cell
                                                                  fill={
                                                                        COLORS[1]
                                                                  }
                                                            />
                                                      )
                                                } else if (
                                                      entry.name === "beacon"
                                                ) {
                                                      return (
                                                            <Cell
                                                                  fill={
                                                                        COLORS[2]
                                                                  }
                                                            />
                                                      )
                                                }
                                          })}
                                          <Tooltip />
                                          <Legend />
                                    </Pie>
                              </PieChart>
                        </ResponsiveContainer>
                        <div className="d-flex justify-content-center">
                              <div>
                                    <h4 style={{ color: COLORS[0] }}>
                                          deauth{" "}
                                          {(
                                                (sumDeauth /
                                                      (sumBeacon +
                                                            sumDeauth +
                                                            sumProbe)) *
                                                100
                                          ).toFixed(2)}{" "}
                                          %
                                    </h4>
                                    <h4 style={{ color: COLORS[1] }}>
                                          probe{" "}
                                          {(
                                                (sumProbe /
                                                      (sumBeacon +
                                                            sumDeauth +
                                                            sumProbe)) *
                                                100
                                          ).toFixed(2)}{" "}
                                          %
                                    </h4>
                                    <h4 style={{ color: COLORS[2] }}>
                                          beacon{" "}
                                          {(
                                                (sumBeacon /
                                                      (sumBeacon +
                                                            sumDeauth +
                                                            sumProbe)) *
                                                100
                                          ).toFixed(2)}{" "}
                                          %
                                    </h4>
                              </div>
                        </div>
                  </>
            )
      }
}
