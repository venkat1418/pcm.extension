import React from 'react';
import PropTypes from 'prop-types';

const LeftNavBtn = ({pageNumber, changePage}) => (
  <div className="leftNavBtnDiv">
    { (pageNumber >1) ?
      <button className="NavBtnBg" onClick={() => changePage(pageNumber-1)} >
        <span className="leftArrow" />
      </button>
          :
      <div className="NavBtnBg disabled_NavBtnBg">
        <span className="leftArrow" />
      </div>
        }
  </div>
)

LeftNavBtn.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired
}

export default LeftNavBtn;
