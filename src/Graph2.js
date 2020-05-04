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

export default class Graph2 extends React.Component {
      render() {
            return (
                  <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={this.props.graph}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                  </ResponsiveContainer>
            )
      }
}
