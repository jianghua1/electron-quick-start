const { contextBridge,ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron
  // fs
})

contextBridge.exposeInMainWorld('electronAPI', {
  // setTitle: (title) => {
  //   ipcRenderer.send('set-title', title)
  // }
  setTitle: (title) => {
    return ipcRenderer.invoke('set-title', title)
  },
  callFormMain: (callback) => ipcRenderer.on('msg-main',callback)
})