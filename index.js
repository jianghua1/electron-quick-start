const { app, BrowserWindow,ipcMain } = require('electron')
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
app.whenReady().then(async () => { 
  createWindow();

  ipcMain.on('set-title', (event, title) => {
    //获取网页上下文
    const win = BrowserWindow.fromWebContents(event.sender)
    //修改title
    win.setTitle(title)
  });
})