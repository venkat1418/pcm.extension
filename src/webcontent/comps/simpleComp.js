import React, { Component } from 'react';


class ImageModule extends Component {
  render() {
    return (
        <div><img src = {this.props.image} alt=""/></div>
    );
  }
};

export default ImageModule;
