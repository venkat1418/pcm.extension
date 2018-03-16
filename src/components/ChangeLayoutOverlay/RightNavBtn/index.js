import React from 'react';
import PropTypes from 'prop-types';

const RightNavBtn = ({pageNumber, totalPageCount, changePage}) => (
  <div className="rightNavBtnDiv">
    {
        (pageNumber < totalPageCount) ?
          <button className="NavBtnBg" onClick={() => changePage(pageNumber+1)}>
            <span className="rightArrow" />
          </button>
          :
          <button className="NavBtnBg disabled_NavBtnBg" >
            <span className="rightArrow" />
          </button>
      }
  </div>
  )

RightNavBtn.propTypes = {
  totalPageCount: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired
}

export default RightNavBtn;
