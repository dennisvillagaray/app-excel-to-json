import React, { Component } from 'react'
import AddFile from './components/AddFile'
import ConverterTextArea from './components/ConverterTextArea'
import ListFiles from './components/ListFilesView'


export default class App extends Component {

  state = {
    item: []
  }

  addFile = (filename, data) => {
    const newItem = {
      id: this.state.item.length + 1,
      filename: filename,
      content: data
    }
    this.setState({
      item: [...this.state.item, newItem]
    })
  };

  deleteFile = id => {
    const newItem = this.state.item.filter(file => file.id !== id)
    this.setState({ item: newItem })
  }

  render() {
    return (
      <div className="container p-4">
        <h2>Excel to Json Converter</h2>
        <form>
          <fieldset>
            <AddFile file={this.state.item} recibir={this.addFile} />
            <div className="form-group">

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
