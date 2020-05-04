import React from "react"
import { withRouter } from "react-router-dom"

class Navbar extends React.Component {
      render() {
            return (
                  <nav
                        class="navbar navbar-expand-lg"
                        style={{ backgroundColor: "#f0f0f0" }}
                  >
                        <a class="navbar-brand" href="#">
                              Wifi Attack Detector
                        </a>
                        <button
                              class="navbar-toggler"
                              type="button"
                              data-toggle="collapse"
                              data-target="#navbarNav"
                              aria-controls="navbarNav"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                        >
                              <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                              <ul class="navbar-nav">
                                    <li class="nav-item active">
                                          <a
                                                class="nav-link"
                                                href="#"
                                                onClick={(e) => {
                                                      e.preventDefault()
                                                      this.props.history.push(
                                                            "/"
                                                      )
                                                }}
                                          >
                                                Home
                                          </a>
                                    </li>
                                    <li class="nav-item">
                                          <a
                                                class="nav-link"
                                                href="#"
                                                onClick={(e) => {
                                                      e.preventDefault()
                                                      this.props.history.push(
                                                            "/attack"
                                                      )
                                                }}
                                          >
                                                Attack
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
                        </div>
                  </nav>
            )
      }
}

export default withRouter(Navbar)
