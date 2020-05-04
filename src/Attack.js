import React from "react"
import Beacon from "./ฺBeacon"
import Deauth from "./Deauth"
import Probe from "./Probe"
export default class Attack extends React.Component {
      render() {
            return (
                  <div
                        class="container-fluid"
                        style={{
                              height: "100%",
                              // backgroundColor: "#a8e6cf",
                        }}
                  >
                        <div
                              className="row flex-fill"
                              style={{ height: "100%" }}
                        >
                              <div className="col-sm-4 mt-3">
                                    <Deauth />
                              </div>
                              <div className="col-sm-4 mt-3">
                                    <Probe />
                              </div>
                              <div className="col-sm-4 mt-3">
                                    <Beacon />
                              </div>
                        </div>
                  </div>
            )
      }
}
