import React from "react"
import Graph2 from "./Graph2"

export default class Card extends React.Component {
      render() {
            return (
                  <div style={{ height: "100%" }}>
                        <div style={{ height: "60%" }}>
                              {this.props.condition ? (
                                    <Graph2 {...this.props} />
                              ) : (
                                    <div
                                          className="d-flex align-items-center justify-content-center"
                                          style={{
                                                height: "100%",
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
                        </div>
                        <div style={{ height: "40%" }}>
                              <div class="card">
                                    <div className="card-header">
                                          <h3>{this.props.attackName}</h3>
                                    </div>
                                    <div class="card-body">
                                          <div className="d-flex justify-content-center">
                                                <form
                                                      className="form-inline"
                                                      onSubmit={(e) => {
                                                            e.preventDefault()
                                                            this.props.handleSubmit()
                                                      }}
                                                >
                                                      <div className="form-group mx-sm-3 mb-2">
                                                            <input
                                                                  type="number"
                                                                  value={
                                                                        this
                                                                              .props
                                                                              .input
                                                                  }
                                                                  onChange={
                                                                        this
                                                                              .props
                                                                              .handleInput
                                                                  }
                                                                  autoComplete="off"
                                                                  className="form-control ml-3"
                                                                  min="0"
                                                                  required
                                                            />
                                                      </div>
                                                      <button
                                                            type="submit"
                                                            className="btn btn-primary mb-2"
                                                      >
                                                            SUBMIT
                                                      </button>
                                                </form>
                                          </div>
                                          <div className="text-center mt-3">
                                                {this.props.attackName} FOUND:{" "}
                                                {this.props.count}
                                          </div>
                                          <div className="text-center mt-3">
                                                LASTEST ATTACK:{" "}
                                                {this.props.lastest}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            )
      }
}
