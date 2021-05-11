import React, { Component } from 'react'

export default class ListFiles extends Component {
  render() {
    const { item } = this.props
    return (
      <div>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {item.name}
          {/* <span className="badge bg-primary rounded-pill">14</span> */}
        </li>
      </div>
    )
  }
}
