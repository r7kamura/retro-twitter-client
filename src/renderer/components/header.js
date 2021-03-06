import React from 'react'
import viewEventPublisher from '../singletons/view-event-publisher'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { queryString: '' };
  }

  onSearchQueryStringChanged(event) {
    this.setState({ queryString: event.target.value });
  }

  onSubmitted(event) {
    event.preventDefault();
    viewEventPublisher.emit('search-query-string-submitted', this.state.queryString);
  }

  render() {
    return(
      <header className="header">
        <h1 className="header-title">
          {this.props.title}
        </h1>
        <form className="header-search-box" onSubmit={this.onSubmitted.bind(this)}>
          <i className="fa fa-search header-search-icon "/>
          <input
            className="header-search-text-field"
            id="search-text-field"
            onChange={this.onSearchQueryStringChanged.bind(this)}
            placeholder="Search"
            tabIndex="-1"
            type="text"
            value={this.state.queryString}
          />
        </form>
      </header>
    );
  }
}
