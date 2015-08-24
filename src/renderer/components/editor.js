import React from 'react'

export default class Editor extends React.Component {
  render() {
    return(
      <div className="editor">
        <div>
          <textarea name="name" rows="3" cols="40" className="editor-textarea" placeholder="What's happening?"></textarea>
        </div>
        <div>
          <button className="editor-submit-button" type="button">
            <i className="fa fa-bullhorn"></i>
            Tweet
          </button>
          <div className="editor-counter">
            140
          </div>
        </div>
      </div>
    );
  }
}
