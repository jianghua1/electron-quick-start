const { app, BrowserWindow,ipcMain,Menu,shell ,MenuItem} = require('electron');
const { type } = require('node:os');
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

// const menus = Menu.buildFromTemplate([
//   {
//     label: app.name,
//     submenu: [
//       {
//         label: 'Undo',
//         click: ()=>win.webContents.send('msg-main','我是来自主进程的消息')
//       }]
//   }
// ])
// Menu.setApplicationMenu(menus)

let menu;

const templates = [
  // 内置菜单
  { role: 'appMenu' },
  { role: 'editMenu' },
  //自定义菜单
  {
    id: '99',
    label: '打开网页',
    submenu: [
      { role: 'reload' },
      { type: 'separator' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      {
        label: '我的主页',
        click: () => { 
          shell.openExternal('https://www.baidu.com')
          //动态设置菜单按钮

        },
        accelerator: 'CmdOrCtrl+H'
      },
      {
        id: '100',
        label: '动态按钮设置',
        click: (ev) => { 
          //动态设置菜单按钮
          ev.visible = false;
          const temp = new MenuItem({
            id: '101',
            label: '设置后按钮',
            accelerator: 'CmdOrCtrl+G'
          });
          menu.getMenuItemById('99').submenu.append(temp);
          Menu.setApplicationMenu(menu);
        },
        accelerator: 'CmdOrCtrl+F'
      },
      {
        id: '102',
        label: '禁用当前按钮',
        click: (ev) => { 
          console.log(ev)
          //动态设置菜单按钮
          ev.enabled = false;
        },
        accelerator: 'CmdOrCtrl+D'
      }
    ]
  }
]

menu = Menu.buildFromTemplate(templates);
Menu.setApplicationMenu(menu);

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