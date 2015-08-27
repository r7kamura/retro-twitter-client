import moment from 'moment'
import React, { PropTypes } from 'react'

moment.locale(
  'en-short',
  {
    relativeTime: {
      d: "1d",
      dd: "%dd",
      future: "%s",
      h: "1h",
      hh: "%dh",
      m: "1m",
      M: "1M",
      mm: "%dm",
      MM: "%dM",
      past: "%s",
      s: "now",
      y: "1y",
      yy: "%dy"
    }
  }
);

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
      return this.getMomentTime().locale('en-short').fromNow();
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
