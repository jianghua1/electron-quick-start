const { app, BrowserWindow,ipcMain,Menu } = require('electron')
const path = require('node:path')

let win;
const createWindow = () => {
  win = new BrowserWindow({
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

const menus = Menu.buildFromTemplate([
  {
    label: app.name,
    submenu: [
      {
        label: 'Undo',
        click: ()=>win.webContents.send('msg-main','我是来自主进程的消息')
      }]
  }
])
Menu.setApplicationMenu(menus)

app.whenReady().then(async () => { 
  createWindow();

  // ipcMain.on('set-title', (event, title) => {
  //   //获取网页上下文
  //   const win = BrowserWindow.fromWebContents(event.sender)
  //   //修改title
  //   win.setTitle(title)
  // });

  ipcMain.handle('set-title', handleTitleChange)
})

async function handleTitleChange(event, data) { 
  return new Promise((resolve) => {
    setTimeout(() => {
      const webContents = event.sender;
      const win2 = BrowserWindow.fromWebContents(webContents);
      win2.setTitle(data);
      resolve('from main');
    }, 2000);
  })
}