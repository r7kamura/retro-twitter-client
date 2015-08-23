import app from 'app'
import BrowserWindow from 'browser-window'
import crashReporter from 'crash-reporter'

crashReporter.start()

const mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1200, height: 800 });
  mainWindow.loadUrl(`file://${__dirname}/../public/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
