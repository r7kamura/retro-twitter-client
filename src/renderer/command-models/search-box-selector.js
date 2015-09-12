export default class SearchBoxSelector {
  select() {
    const textField = document.querySelector('#search-text-field')
    textField.focus();
    textField.select();
  }
}
