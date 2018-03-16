import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import  '../../../css/leftPanel.scss';


class LayoutImages extends Component {

  addClass = (id) => {
    const currentLayout = Array.from(document.getElementsByClassName("currentLayout") || []);
    const layoutRows = Array.from(document.getElementsByClassName("layoutRows") || []);
    currentLayout.forEach((item) => {item.classList.remove("currentLayout");})
    layoutRows.forEach((item) => {
      item.classList.add("layoutRowsNonSelect");
      item.classList.remove("layoutRows");
    })
    document.getElementById(id).classList.add("currentLayout");
    const selected = id.slice(12);
    if(selected  !== this.props.moduleId ) {
      this.props.layoutIdSelected(id);
      document.getElementById(selected).classList.add("layoutRows");
      document.getElementById(selected).classList.remove("layoutRowsNonSelect");
    } else{
      this.props.layoutIdSelected("");
    }
  }

  getLayoutImages = () => {
    const { recsPerPage, pageNo, layoutData, moduleId } = this.props;
    const pageStartIndex = (pageNo-1) * recsPerPage;
    const pageEndIndex = pageStartIndex + recsPerPage <  layoutData.length
      ? pageStartIndex + recsPerPage : layoutData.length;
    const newItems = layoutData.slice(pageStartIndex, pageEndIndex);

    if(newItems.length >= 6) // TODO: need to relook at this
    {
      const target = document.getElementById('cl_container');
      target.classList.add('changeLayout_Container_new');
      if ( document.getElementById("cl_container").classList.contains('changeLayout_Container') ) {
        target.classList.remove('changeLayout_Container');
      }
    }

    const rows = newItems.map( (row, index) => (
      <div
        id={row.moduleId}
        className={(row.moduleId === moduleId) ? "layoutRowsDef" : "layoutRowsNonSelect"}
        key={index}>

        <div
          onClick={() => this.addClass(`layoutSelect${row.moduleId}`)}
          className="layoutImage"
          role="button"
          tabIndex="0"
        >
          <img className="layoutImg" alt="" src={row.image} />
          { (row.moduleId === moduleId) ?
            <div id={`layoutSelect${row.moduleId}`} className="currentLayout" >
              <span className="currentLayoutSpan">CURRENT LAYOUT</span>
            </div>
            :
            <div  id={`layoutSelect${row.moduleId}`} >
              <div className="checkMark"><span className="checkMarkSpan" /></div>
            </div>
          }
        </div>

        <div>
          <span className="layoutRowDesc">{row.name}</span>
        </div>

        <div>
          <span className="layoutRowStories">{row.details}</span>
        </div>

      </div>
    ));

    return rows;
  };

  getPager = () => {
    const { recsPerPage, layoutData, pageNumber } = this.props;
    const count = Math.ceil(layoutData.length/recsPerPage);
    const rows = [...Array(count)].map( (row, index) => (
      <div key={index} className={(row === pageNumber )? "indicator_active" : "indicator_inactive"} />
    ));
    return rows;
  }

  render() {
     return (
       <div>
         <div className="layoutSection">
           <div> {this.getLayoutImages()}</div>
         </div>
         <div className="layoutFooter"> {this.getPager()} </div>
       </div>
     );
   }
};

LayoutImages.propTypes = {
  moduleId: PropTypes.string.isRequired,
  pageNo: PropTypes.number.isRequired,
  layoutIdSelected: PropTypes.func.isRequired,
  layoutData: PropTypes.array.isRequired,
  recsPerPage: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
}

export default LayoutImages;
