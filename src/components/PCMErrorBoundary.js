import React, { Component } from 'react';
// import {NotificationManager} from 'react-notifications';

export default class PCMErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // NotificationManager.error(`Status is not 200!\n\nCurrent Status is ${resp.status}`)
      return <h1>Something went wrong. Please try again</h1>;
    }
    return this.props.children;
  }
}
