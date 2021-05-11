import React, { Component } from 'react'
import AddFile from './components/AddFile'
import ListFiles from './components/ListFilesView'

export default class App extends Component {

  state = {
    item: [
      {
        id: 1,
        name: 'one'
      },
      {
        id: 2,
        name: 'two'
      },
      {
        id: 3,
        name: 'three'
      }
    ]
  }
  render() {
    return (
      <div className="container p-4">
        <h2>Convertidor de Excel a Json</h2>
        <form>
          <fieldset>
            <AddFile />
            <ul className="list-group mt-4">
              {this.state.item.map(item => {
                return < ListFiles key={item.id} item={item} />
              })
              }
            </ul>


          </fieldset>
        </form>
      </div>
    )
  }
}
