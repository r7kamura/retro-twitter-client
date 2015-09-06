import React from 'react'

export default class Header {
  render() {
    return(
      <header className="header">
        <h1 className="header-title">
          {this.props.title}
        </h1>
        <div className="header-search-box">
          <i className="fa fa-search header-search-icon "/>
          <input className="header-search-text-field" placeholder="Search" type="text" />
        </div>
      </header>
    );
  }
}
