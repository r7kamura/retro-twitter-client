import keyStringDetector from '../singletons/key-string-detector'
import React from 'react'
import twitterClient from '../libraries/twitter-client'
import viewEventPublisher from '../singletons/view-event-publisher'

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
    if (keyStringDetector.detect(event) === 'Return') {
      event.preventDefault();
      this.onTweetSubmitted();
    }
  }

  render() {
    return(
      <div className="editor">
        <div className="editor-box">
          <textarea name="name" rows="2" cols="40" className="editor-textarea" onChange={this.onTextareaChanged.bind(this)} onKeyDown={this.onTextareaKeyDown.bind(this)} placeholder="What's happening?" value={this.state.text}></textarea>
          <div className="editor-counter">
            {this.getRestTextLength()}
          </div>
        </div>
      </div>
    );
  }

  onTweetSubmitted() {
    viewEventPublisher.emit('tweet-submitted', this.state.text);
    this.setState({ text: '' });
  }
}
