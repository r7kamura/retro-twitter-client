import { EventEmitter } from 'events';

class AccountStore extends EventEmitter {
  constructor() {
    super();
    this.account = {};
  }

  getAccount() {
    return this.account;
  }

  updateAccount(account) {
    this.account = account;
    this.emit('changed');
  }
}

export default new AccountStore();
