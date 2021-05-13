import React, { Component } from 'react'
import { changeClass } from "../common/changeClass";

export default class ConverterTextArea extends Component {

  style = 'btn btn-outline-success'

  // changeClass = (element, newClass) => {
  //   element.removeAttribute('class')
  //   element.setAttribute('class', `${newClass}`)
  // }

  copyJson = (e) => {
    let aux = document.createElement('input')
    aux.setAttribute('value', JSON.stringify(this.props.filename.content))
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux);

    changeClass(e.target, this.style)
    e.target.innerText = 'Copied'
  }
  downloadFile = (e) => {
    const item = this.props.filename.content
    // this.prueba(this.generarTexto(this.state.item), 'archivo.txt');
    // if (item.length == 0 || item == undefined) {
    //   return alert('falta seleccionar archivo')
    // }
    // this.descargarArchivo(this.generarTexto(this.state.item), 'archivo.txt');

    changeClass(e.target, this.style)
    e.target.innerText = 'Downloaded'

  }
  render() {

    const { filename } = this.props
    return (
      <>
        <div className="form-group">
          <label htmlFor="exampleTextarea" className="form-label mt-4"><b>{filename.filename}</b> converted to Json</label>
          <textarea className="form-control" defaultValue={JSON.stringify(filename.content, undefined, 4)} readOnly={true} id="exampleTextarea" rows="10" />
          <div className="form-group d-flex justify-content-between mt-4">
            <button type="button"
              onClick={this.copyJson}
              className="btn btn-outline-info">Copy</button>
            <button
              type="button"
              className="btn btn-outline-info"
              id="test"
              onClick={this.downloadFile}>Download File</button>
          </div>
        </div>
      </>
    )
  }
}
