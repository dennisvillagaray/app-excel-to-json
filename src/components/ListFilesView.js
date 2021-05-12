import React, { Component } from 'react'

export default class ListFiles extends Component {
  render() {
    const { item } = this.props
    return (
      <div>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {item.filename}
          <button
            className="btn btn-danger"
            onClick={this.props.deleteFile.bind(this, item.id)}
            type="button">Delete</button>
        </li>
      </div>
    )
  }
}
