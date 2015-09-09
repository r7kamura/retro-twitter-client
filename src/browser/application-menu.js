import EventEmitter from 'events'
import Menu from 'menu'

export default class ApplicationMenu extends EventEmitter {
  constructor() {
    super();
    const self = this;
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
                  self.emit('quit');
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
          },
          {
            label: 'View',
            submenu: [
              {
                label: 'Search',
                accelerator: 'Command+F',
                click() {
                  self.emit('search')
                }
              },
              {
                label: 'Select next channel',
                accelerator: 'Command+]',
                click() {
                  self.emit('select-next-channel');
                }
              },
              {
                label: 'Select previous channel',
                accelerator: 'Command+[',
                click() {
                  self.emit('select-previous-channel');
                }
              },
              {
                label: 'Reload',
                accelerator: 'Command+R',
                click() {
                  self.emit('reload');
                }
              },
              {
                label: 'Open DevTools',
                accelerator: 'Alt+Command+I',
                click() {
                  self.emit('open-dev-tools');
                }
              }
            ]
          }
        ]
      )
    );
  }
}
