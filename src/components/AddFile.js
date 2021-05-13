import React, { Component } from 'react'
import XLSX from "xlsx";

import { changeClass } from "../common/changeClass";

export default class AddFile extends Component {

  state = {
    filename: '',
    data: []
  }

  isConverted = false

  //* Prueba
  handleFile = (file) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'json' });
      const wsname = wb.SheetNames;
      const ws = wb.Sheets[wsname[0]];
      const data = XLSX.utils.sheet_to_json(ws);

      this.setState({
        filename: file.name,
        data: data
      })
    };
    rABS ? reader.readAsBinaryString(file) : reader.readAsArrayBuffer(file);
  }

  convertir = (e) => {
    this.props.recibir(this.state.filename, this.state.data)
    // console.log('enviando -> ', this.state.filename, this.state.data)

    this.isConverted = true
  }

  handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) this.handleFile(files[0]);

    this.isConverted = false
  };
  //* Fin prueba
  SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
  ].map(x => `.${x}`).join(",");

  render() {
    const newStyle = this.isConverted ? 'btn btn-success mt-2' : 'btn btn-primary mt-2'
    const textConverter = this.isConverted ? 'Converted' : 'Converter'
    return (
      <>
        <div className="form-group">
          <label htmlFor="formFile" className="form-label mt-4">Input file</label>
          <input className="form-control" type="file" accept={this.SheetJSFT} onChange={this.handleChange} id="formFile" />
        </div>
        <div className="form-group d-flex">
          <button type="button" className={newStyle} onClick={this.convertir}>{textConverter}</button>
        </div>
      </>
    )
  }
}
