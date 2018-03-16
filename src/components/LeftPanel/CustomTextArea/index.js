import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CustomTextArea extends Component{
    constructor(props){
        super(props)
        this.state={
            textValue: this.props.headline
        }
    }

    componentDidMount(){
        document.getElementById("selectedTextarea").select();
    }

    componentWillUnmount(){
        this.props.handleChangedHeadline('');
    }

    handleChange = (e) => {
        e.preventDefault();
        this.props.onChangeTextarea(e.target.value);
        this.setState({ textValue: e.target.value });
    }

    onBlur =(e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.onBlur();
        return false
    }

    render(){
        return(
          <textarea
            className="react_inline_textarea_editing"
            id="selectedTextarea"
            rows={this.props.isPkgHeader ? "1" : "3"}
            onChange={this.handleChange}
            onBlur={this.onBlur}
            value={this.state.textValue}
             />
        )
    }
}

CustomTextArea.propTypes = {
  headline: PropTypes.string.isRequired,
  handleChangedHeadline: PropTypes.func.isRequired,
  onChangeTextarea: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  isPkgHeader: PropTypes.bool
}

CustomTextArea.defaultProps = {
  isPkgHeader: false
}
