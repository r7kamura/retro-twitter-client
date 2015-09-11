import React from 'react'
import twitterClient from '../libraries/twitter-client'

/**
 * @param {KeyboardEvent} event
 * @return {String}
 */
const keyStringOf = (event) => {
  if (event.keyCode === 13) {
    if (event.ctrlKey) {
      return 'Ctrl+Return';
    } else {
      return 'Return';
    }
  } else {
    return '';
  }
};

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  getRestTextLength() {
    return 140 - this.state.text.length;
  }

  onTextareaChanged(event) {
    this.setState({ text: event.target.value });
  }

  onTextareaKeyDown(event) {
    if (keyStringOf(event) === 'Return') {
      event.preventDefault();
      this.onTweetSubmitted();
    }
  }

  render() {
    return(
      <div className="editor">
        <textarea name="name" rows="2" cols="40" className="editor-textarea" onChange={this.onTextareaChanged.bind(this)} onKeyDown={this.onTextareaKeyDown.bind(this)} placeholder="What's happening?" value={this.state.text}></textarea>
        <div className="editor-counter">
          {this.getRestTextLength()}
        </div>
      </div>
    );
  }

  onTweetSubmitted() {
    this.props.onTweetSubmitted(this.state.text);
    this.setState({ text: '' });
  }
}
