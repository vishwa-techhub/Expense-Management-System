const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const { fork } = require('child_process');
const http = require('http');

let mainWindow = null;
let serverProcess = null;
const PORT = 5000;

function waitForBackend(callback, attempt = 0) {
  if (attempt > 30) {
    console.error('Backend failed to respond in time');
    if (callback) callback();
    return;
  }
  
  http.get(`http://localhost:${PORT}/api/health`, (res) => {
    if (res.statusCode === 200) {
      if (callback) callback();
    } else {
      setTimeout(() => waitForBackend(callback, attempt + 1), 200);
    }
  }).on('error', () => {
    setTimeout(() => waitForBackend(callback, attempt + 1), 200);
  });
}

function startBackendServer() {
  const serverScript = path.join(__dirname, 'backend', 'src', 'server.js');
  
  serverProcess = fork(serverScript, [], {
    env: { ...process.env, PORT: PORT, NODE_ENV: 'production' },
    stdio: 'ignore'
  });

  serverProcess.on('error', (err) => {
    console.error('Backend process error:', err);
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 1024,
    minHeight: 700,
    title: 'CashFlow - Expense Management System',
    autoHideMenuBar: true,
    backgroundColor: '#020617',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadURL(`http://localhost:${PORT}`);

  // Open external links in default system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  startBackendServer();
  waitForBackend(() => {
    createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (serverProcess) {
    try {
      serverProcess.kill();
    } catch (e) {}
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
