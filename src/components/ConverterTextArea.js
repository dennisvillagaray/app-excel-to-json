import React, { Component } from 'react'

export default class ConverterTextArea extends Component {

  copyJson = () => {
    let aux = document.createElement('input')
    aux.setAttribute('value', JSON.stringify(this.props.filename.content))
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux);
    alert('successfully copied')
  }

  render() {
    const { filename } = this.props
    console.log(filename.content)
    return (
      <div className="form-group">
        <label htmlFor="exampleTextarea" className="form-label mt-4">Converter textarea de <b>{filename.filename}</b></label>
        <textarea className="form-control" defaultValue={JSON.stringify(filename.content)} readOnly={true} id="exampleTextarea" rows="10" />
        <button type="button"
          onClick={this.copyJson}
          className="btn btn-outline-info">Copy</button>
      </div>
    )
  }
}
