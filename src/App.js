import React from "react"
import firebase from "./config/firebase"
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"
import Attack from "./Attack"
import Line from "./Line"
import Stat from "./Stat"
import Navbar from "./Navbar"

export default class App extends React.Component {
      render() {
            return (
                  <>
                        <BrowserRouter>
                              <Navbar />
                              <Switch>
                                    <Route
                                          path="/"
                                          exact={true}
                                          component={Attack}
                                    />
                                    <Route
                                          path="/line"
                                          exact={true}
                                          component={Line}
                                    />
                                    <Route
                                          path="/stat"
                                          exact={true}
                                          component={Stat}
                                    />
                              </Switch>
                        </BrowserRouter>
                  </>
            )
      }
}
