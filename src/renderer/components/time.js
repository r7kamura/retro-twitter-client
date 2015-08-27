import moment from 'moment'
import React, { PropTypes } from 'react'

export default class Time extends React.Component {
  componentDidMount() {
    setInterval(this.update.bind(this), 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.update.bind(this));
  }

  getHumanReadableTime() {
    if (this.getIsBefore24HoursAgo()) {
      return this.getMomentTime().format('YYYY-MM-DD HH:mm');
    } else {
      return this.getMomentTime().fromNow();
    }
  }

  getIsBefore24HoursAgo() {
    return this.getMomentTime().isBefore(moment.duration(24, 'hours'));
  }

  getMachineReadableTime() {
    return this.getMomentTime().format('YYYY-MM-DDTHH:mm:ssZ');
  }

  getMomentTime() {
    return moment(new Date(this.props.time));
  }

  render() {
    const humanReadableTime = this.getHumanReadableTime();
    return(
      <time {...this.props} dateTime={this.getMachineReadableTime()} title={humanReadableTime}>
        {humanReadableTime}
      </time>
    );
  }

  update() {
    this.forceUpdate();
  }
}
