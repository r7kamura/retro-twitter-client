import { EventEmitter } from 'events'
import keyStringDetector from '../singletons/key-string-detector'

export default class KeyboardEventPublisher extends EventEmitter {
  constructor() {
    super();
    document.addEventListener('keydown', (event) => {
      if (event.target === document.body) {
        this.emit(keyStringDetector.detect(event), event);
      }
    });
  }
}
