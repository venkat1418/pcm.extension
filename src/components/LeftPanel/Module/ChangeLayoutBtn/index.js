import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChangeLayoutOverlay from '../../../ChangeLayoutOverlay';

export default class ChangeLayoutBtn extends Component{

    componentWillMount() {
      this.setState({showOverlay: false});
    };

    changeLayout = () => {
      this.setState({showOverlay: !this.state.showOverlay});
    }

    changeLayoutClose = () =>{
      this.setState({showOverlay:false});
    }

    render(){
        return(
          <div>
            <button className="cus_btn" onClick={this.changeLayout} >CHANGE LAYOUT</button>
            {this.state.showOverlay && <ChangeLayoutOverlay
              moduleIndex={this.props.moduleIndex}
              moduleId={this.props.moduleId}
              source={this.props.source}
              zone={this.props.zone}
              showOverlay={this.state.showOverlay}
              changeLayoutClose={this.changeLayoutClose}
              />
            }
          </div>
        )
    }
}

ChangeLayoutBtn.propTypes = {
  moduleId: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  zone: PropTypes.string.isRequired,
  moduleIndex: PropTypes.number.isRequired
}
