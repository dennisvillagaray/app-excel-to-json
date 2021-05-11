const { app, BrowserWindow, Menu, Accelerator } = require('electron');
const url = require('url')
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
  });
}

let mainWindow, newProductWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true
    }
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/index.html'),
    protocol: 'file',
    slashes: true
  }))

  const mainMenu = Menu.buildFromTemplate(templateMenu)
  Menu.setApplicationMenu(mainMenu)

  mainWindow.on('close', () => {
    app.quit()
  })
})

// createNewProductWindow = () => {
//   newProductWindow = new BrowserWindow({
//     width: 400,
//     height: 400,
//     title: 'Add A New Product'
//   })
//   newProductWindow.setMenu(null)
//   newProductWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'views/new-product.html'),
//     protocol: 'file',
//     slashes: true
//   }))
// }

const isMac = process.platform === 'darwin'

const templateMenu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Product',
        accelerator: 'Ctrl+N',
        click() {
          // createNewProductWindow()
        }
      },
      {
        label: 'Exit',
        accelerator: isMac ? 'command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
]

if (process.env.NODE_ENV !== 'production') {
  templateMenu.push({
    label: 'DevTools',
    submenu: [
      {
        label: ' Show/Hide Dev Tools',
        accelerator: 'Ctrl+D',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}
