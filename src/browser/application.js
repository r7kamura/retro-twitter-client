import { openExternal } from 'shell'
import app from 'app'
import AuthenticationWindow from './authentication-window'
import crashReporter from 'crash-reporter'
import globalShortcut from 'global-shortcut'
import MainWindow from './main-window'
import Menu from 'menu'

export default class Application {
  constructor() {
    this.accessToken = null;
    this.accessTokenSecret = null;
    this.consumerKey = 'KAR2eM09o2GCddFfHUXz7vFKV';
    this.consumerSecret = '8MoozYzEzkstemW4fagnm5qlGMVELIxuWBTcBOz0BpUDIpDWqY';
    this.mainWindow = null;
  }

  onAuthenticationSucceeded({ accessToken, accessTokenSecret }) {
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    this.openMainWindow();
  }

  onReady() {
    this.openAuthenicationWindow();
    this.setApplicationMenu();
    this.registerGlobalShortcuts();
  }

  openAuthenicationWindow() {
    new AuthenticationWindow({
      consumerKey: this.consumerKey,
      consumerSecret: this.consumerSecret,
    }).on(
      'authentication-succeeded',
      this.onAuthenticationSucceeded.bind(this)
    );
  }

  openMainWindow() {
    this.mainWindow = new MainWindow();
  }

  registerApplicationCallbacks() {
    app.on('window-all-closed', () => {});
    app.on('ready', this.onReady.bind(this));
  }

  registerGlobalShortcuts() {
    globalShortcut.register('Alt+Down', this.selectNextChannel.bind(this));
    globalShortcut.register('Alt+Up', this.selectPreviousChannel.bind(this));
  }

  run() {
    this.startCrashReporter();
    this.registerApplicationCallbacks();
  }

  selectNextChannel() {
    this.mainWindow.send('select-next-channel-requested');
  }

  selectPreviousChannel() {
    this.mainWindow.send('select-previous-channel-requested');
  }

  setApplicationMenu() {
    Menu.setApplicationMenu(
      Menu.buildFromTemplate(
        [
          {
            label: 'Application',
            submenu: [
              {
                label: 'About',
                click() {
                  openExternal('https://github.com/r7kamura/retro-twitter-client');
                }
              },
              {
                type: 'separator'
              },
              {
                label: 'Quit',
                accelerator: 'Command+Q',
                click() {
                  app.quit();
                }
              }
            ]
          },
          {
            label: 'Edit',
            submenu: [
              {
                label: 'Undo',
                accelerator: 'Command+Z',
                selector: 'undo:'
              },
              {
                label: 'Redo',
                accelerator: 'Shift+Command+Z',
                selector: 'redo:'
              },
              {
                type: 'separator'
              },
              {
                label: 'Cut',
                accelerator: 'Command+X',
                selector: 'cut:'
              },
              {
                label: 'Copy',
                accelerator: 'Command+C',
                selector: 'copy:'
              },
              {
                label: 'Paste',
                accelerator: 'Command+V',
                selector: 'paste:'
              },
              {
                label: 'Select All',
                accelerator: 'Command+A',
                selector: 'selectAll:'
              }
            ]
          }
        ]
      )
    );
  }

  startCrashReporter() {
    crashReporter.start();
  }
}
