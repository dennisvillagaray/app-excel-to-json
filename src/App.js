import React, { Component } from 'react'
import AddFile from './components/AddFile'
import ConverterTextArea from './components/ConverterTextArea'
import ListFiles from './components/ListFilesView'

export default class App extends Component {

  state = {
    item: [],
    show: false
  }

  // * Prueba
  // prueba = (data) => {
  //   dialog.showSaveDialog(fildName => {
  //     if (filename == undefined) {
  //       console.log('no guardaste nada')
  //       return
  //     }
  //     fs.watchFile(fildName, data, err => {
  //       err ? console.log('error', err) : console.log('exito')
  //     })
  //   })
  // }
  // * Fin Prueba

  descargarArchivo = (contenidoEnBlob, nombreArchivo) => {
    var reader = new FileReader();
    reader.onload = function (event) {
      var save = document.createElement('a');
      save.href = event.target.result;
      save.target = '_blank';
      save.download = nombreArchivo || 'archivo.json';
      var clicEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      save.dispatchEvent(clicEvent);
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
    console.log('descargando')
  };

  generarTexto = (filename, data) => {
    // let texto = []
    // texto.push(datos)
    // return new Blob(texto, {
    //   type: 'text/plain'//'application/json'
    // });
    const newItem = {
      id: this.state.item.length + 1,
      filename: filename,
      content: data
    }
    this.setState({
      item: [...this.state.item, newItem],
      show: true
    })
  };

  downloadFile = () => {
    const item = this.state.item
    // this.prueba(this.generarTexto(this.state.item), 'archivo.txt');
    if (item.length == 0 || item == undefined) {
      return alert('falta seleccionar archivo')
    }
    this.descargarArchivo(this.generarTexto(this.state.item), 'archivo.txt');
    console.log(this.state.item)

  }

  deleteFile = id => {
    const newItem = this.state.item.filter(file => file.id !== id)
    this.setState({ item: newItem })
  }

  render() {
    return (
      <div className="container p-4">
        <h2>Convertidor de Excel a Json</h2>
        <form>
          <fieldset>
            <AddFile file={this.state.item} recibir={this.generarTexto} />
            <div className="form-group">
              {/* <button type="button" className="btn btn-secondary mt-4" onClick={this.downloadFile}>Download File</button> */}
            </div>
            <ul className="list-group mt-4">
              {this.state.item.map(item => {
                return < ListFiles key={item.id} item={item} deleteFile={this.deleteFile} />
              })
              }
            </ul>
            {
              this.state.item.map(item => {
                return <ConverterTextArea key={item.id} filename={item} />
              })
            }
          </fieldset>
        </form>
      </div>
    )
  }
}
