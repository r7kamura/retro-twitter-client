import app from 'app'
import AuthenticationWindow from './authentication-window'
import crashReporter from 'crash-reporter'
import MainWindow from './main-window'

export default class Application {
  constructor() {
    this.credentials = null;
    this.mainWindow = null;
    this.windows = [];
    this.startCrashReporter();
    this.registerApplicationCallbacks();
  }

  registerApplicationCallbacks() {
    app.on('window-all-closed', () => {
      if (process.platform != 'darwin') {
        app.quit();
      }
    });
    app.on('ready', () => {
      new AuthenticationWindow((credentials) => {
        this.credentials = credentials;
        this.openMainWindow();
      });
    });
  }

  openMainWindow() {
    this.windows.push(new MainWindow());
  }

  startCrashReporter() {
    crashReporter.start();
  }
}
