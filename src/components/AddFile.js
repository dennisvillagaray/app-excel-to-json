import React, { Component } from 'react'
// const xlsx = require('xlsx')
import XLSX from "xlsx";

export default class AddFile extends Component {

  state = {
    filename: '',
    data: []
  }

  //* Prueba
  handleFile = (file) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'json' });
      /* Get first worksheet */
      const wsname = wb.SheetNames;
      const ws = wb.Sheets[wsname[0]];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      // console.log('e -> ',file.name);

      this.setState({
        filename: file.name,
        data: data
      })

      // let conv = new Transform({ writableObjectMode: true });

      // conv._transform = function (obj, e, cb) { cb(null, JSON.stringify(obj) + "\n"); };

      // data.pipe(conv); conv.pipe(process.stdout);
      // console.log('data2 ->',data);
      // let blob = new Blob([JSON.stringify(data)], { type: "" })
      // saveAs(blob, "prueba.json")

      // setCols(make_cols(ws['!ref']))
    };
    rABS ? reader.readAsBinaryString(file) : reader.readAsArrayBuffer(file);
  }

  convertir = () => {
    this.props.recibir(this.state.filename, this.state.data)
    console.log('enviando -> ', this.state.filename, this.state.data)
  }

  handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) this.handleFile(files[0]);
  };
  //* Fin prueba
  SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
  ].map(x => `.${x}`).join(",");

  render() {
    console.log()
    return (
      <>
        <div className="form-group">
          <label htmlFor="formFile" className="form-label mt-4">Input file</label>
          <input className="form-control" type="file" accept={this.SheetJSFT} onChange={this.handleChange} id="formFile" />
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-primary mt-2" onClick={this.convertir}>Convertir</button>
        </div>
      </>
    )
  }
}
