const { app, BrowserWindow } = require('electron')
const store = require('./src/utils/Store.js')

try {
    require('electron-reloader')(module)
  } catch (_) {}

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    maxHeight:600,
    maxWidth:800,
    minHeight:600,
    minWidth:800,
    webPreferences: {
      nodeIntegration: true
    },
    title:"Moust",
  })
  win.loadURL('http://localhost:3000');
}


app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

console.log(store.get('idUser'))


