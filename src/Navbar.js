import React from "react"
import { withRouter } from "react-router-dom"
import firebase from "./config/firebase"

class Navbar extends React.Component {
      render() {
            return (
                  <nav
                        className="navbar navbar-expand-lg navbar-light"
                        style={{ backgroundColor: "#f0f0f0" }}
                  >
                        <a
                              className="navbar-brand"
                              href="#"
                              onClick={(e) => {
                                    e.preventDefault()
                                    this.props.history.push("/")
                              }}
                        >
                              Wifi Attack Detector
                        </a>
                        <button
                              className="navbar-toggler"
                              type="button"
                              data-toggle="collapse"
                              data-target="#navbarSupportedContent"
                              aria-controls="navbarSupportedContent"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                        >
                              <span className="navbar-toggler-icon" />
                        </button>
                        <div
                              className="collapse navbar-collapse"
                              id="navbarSupportedContent"
                        >
                              <ul className="navbar-nav mr-auto">
                                    <li class="nav-item">
                                          <a
                                                class="nav-link"
                                                href="#"
                                                onClick={(e) => {
                                                      e.preventDefault()
                                                      this.props.history.push(
                                                            "/device"
                                                      )
                                                }}
                                          >
                                                Device
                                          </a>
                                    </li>
                                    <li class="nav-item">
                                          <a
                                                class="nav-link"
                                                href="#"
                                                onClick={(e) => {
                                                      e.preventDefault()
                                                      this.props.history.push(
                                                            "/line"
                                                      )
                                                }}
                                          >
                                                Line Setting
                                          </a>
                                    </li>
                                    <li class="nav-item">
                                          <a
                                                class="nav-link"
                                                href="#"
                                                onClick={(e) => {
                                                      e.preventDefault()
                                                      this.props.history.push(
                                                            "/stat"
                                                      )
                                                }}
                                          >
                                                Statistic
                                          </a>
                                    </li>
                              </ul>

                              <button
                                    className="btn btn-outline-danger my-2 my-sm-0"
                                    type="button"
                                    onClick={() => {
                                          firebase
                                                .database()
                                                .ref("/deauth")
                                                .remove()
                                          firebase
                                                .database()
                                                .ref("/probe")
                                                .remove()
                                          firebase
                                                .database()
                                                .ref("/beacon")
                                                .remove()
                                          firebase
                                                .database()
                                                .ref("/mac")
                                                .remove()
                                          firebase
                                                .database()
                                                .ref("/notification")
                                                .remove()
                                    }}
                              >
                                    Reset
                              </button>
                        </div>
                  </nav>
            )
      }
}

export default withRouter(Navbar)
