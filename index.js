const { app, BrowserWindow } = require('electron')
const path = require('node:path')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  //窗口对象win
  win.loadFile('index.html');
  win.webContents.openDevTools();
}
app.whenReady().then(createWindow)