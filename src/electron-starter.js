/* eslint-disable no-unused-vars */
const electron = require("electron");
// Module to control application life.
const { app } = electron;
// Module to create native browser window.
const { BrowserWindow } = electron;

const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let main;
const port = process.env.PORT || 3000;
const startUrl = url.format({
  pathname: path.join(__dirname, "../build/index.html"),
  protocol: "file:",
  slashes: true,
});
// const startUrl = process.env.ELECTRON_START_URL || `http://localhost:${port}`;
function createWindow() {
  const loading = new BrowserWindow({ show: false, frame: false, width: 1500, height: 2000 });
  loading.webContents.session.clearCache(() => {
    // some callback.
  });
  loading.once("show", () => {
    main = new BrowserWindow({ show: false, width: 1500, height: 2000 });
    main.webContents.session.clearCache(() => {
      // some callback.
    });
    main.webContents.once("dom-ready", () => {
      console.log("main loaded");
      main.show();
      loading.hide();
      loading.close();
      // Open the DevTools.
      // mainWindow.webContents.openDevTools();
      // mainWindow.webContents.on("devtools-opened", () => {
      //   mainWindow.webContents.closeDevTools();
      // });
      // Emitted when the window is closed.
    });
    main.on("closed", () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      main = null;
    });
    // long loading html
    main.loadURL(startUrl);
  });
  loading.loadFile("loading.html");
  loading.show();
}

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (main === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
