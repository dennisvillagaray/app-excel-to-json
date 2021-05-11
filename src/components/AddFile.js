import React, { Component } from 'react'
// const xlsx = require('xlsx')
import XLSX from "xlsx";

export default class AddFile extends Component {

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
      console.log(data);
      // setCols(make_cols(ws['!ref']))
    };
    if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }

  handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) this.handleFile(files[0]);
  };
  //* Fin prueba

  // onChange(e) {
  //   let files = e.target.files;
  //   console.log(files);
  //   // let filesArr = Array.prototype.slice.call(files);
  //   // console.log(filesArr);
  //   // this.setState({ files: [...this.state.files, ...filesArr] });
  // }
  SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
  ].map(x => `.${x}`).join(",");


  // excelJSON = (file) => {
  //   let filePath = file.target.files[0].path

  //   // const excel = XLSX.readFile(filePath)
  //   // let nameHoja = excel.SheetNames
  //   // let data = XLSX.utils.sheet_add_json(excel, { header: 1 })
  //   // // let datos = XLSX.utils.sheet_to_json(excel.Sheets[nameHoja[0]])
  //   // console.log(data)
  //   const excel = XLSX.readFile(filePath)
  //   let nameHoja = excel.SheetNames
  //   let datos = XLSX.utils.sheet_to_json(excel.Sheets[nameHoja[0]])

  //   console.log(datos)
  // }

  render() {
    console.log()
    return (
      <div className="form-group">
        <label htmlFor="formFile" className="form-label mt-4">Default file input example</label>
        <input className="form-control" type="file" accept={this.SheetJSFT} onChange={this.handleChange} id="formFile" />
      </div>
    )
  }
}
