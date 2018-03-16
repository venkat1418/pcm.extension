"use strict";
//var pageStore     = require('./appStore');
//import store  from 'appStore.js';

var tStyle1 = {
  position: "absolute",
  top: "50px",
  left: 0,
  width: "40%",
   color: "brown",
   font: "bold 20px/45px Helvetica, Sans-Serif",
   letterSpacing: "-1px",
   padding: "15px"
};

var tStyle2 = {
  position: "absolute",
  top: "150px",
  left: 0,
  width: "40%",
   color: "black",
   font: "bold 28px/45px Helvetica, Sans-Serif",
   letterSpacing: "-1px",
   padding: "15px"
};

var iStyle =  {
   position: "relative",
   width: "100%"
};

var data = [
    { 
        "storyid": "b000",
        "title": "POSITION 1",
        "headline": "President Trump:'Hurricane is of proportion,' but the government is ready"
    },
    {
        "storyid": "b001",
        "title": "POSITION 2",
        "headline": "Hurricane Irma will 'devastate' parts of the United States, FEMA chief says"
    },
    {
        "storyid": "b002",
        "title": "POSITION 3",
        "headline": "After hitting Florida, Hurricane irma on track to strike world's busiest airport"
    },
    {
        "storyid": "b003",
        "title": "POSITION 4",
        "headline": "Home Depot is retail's bright spot as it courts younger shoppers who prefer DIY"
    },
    { 
        "storyid": "b004",
        "title": "POSITION 5",
        "headline": "President Trump:'Hurricane is of proportion,' but the government is ready"
    },
    // {
    //     "storyid": "b005",
    //     "title": "POSITION 6",
    //     "headline": "Hurricane Irma will 'devastate' parts of the United States, FEMA chief says"
    // },
    // {
    //     "storyid": "b006",
    //     "title": "POSITION 7",
    //     "headline": "After hitting Florida, Hurricane irma on track to strike world's busiest airport"
    // },
    // {
    //     "storyid": "b007",
    //     "title": "POSITION 8",
    //     "headline": "Home Depot is retail's bright spot as it courts younger shoppers who prefer DIY"
    // }
];

var proData = [{ "storyid": "s1d1",
    "headline": "[PRO] Japan's leader just won a resounding election victory, but he's still unpopular"
}, {
    "storyid": "sid2",
    "headline": "[PRO] Cryptocurrencies are 'not mature enough' to assess their impact"
}, {
    "storyid": "sid3",
    "headline": "[PRO] China's exports to North Korea jumped 20.9% in first three quarters of 2017"
}
// , {
//     "storyid": "sid4",
//     "headline": "[PRO] Strained French-German ties and a rudderless EU are losing"
// }
];

var Hero2 = React.createClass({
    displayName: "Hero2",
    //state : {},
    componentDidMount: function() {
        this.setState({pro : "no"});
    },

    drag:  function(ev) {
        console.log('drag ' + ev.target.id);
        ev.dataTransfer.setData("sid", ev.target.id);
        ev.dataTransfer.setData("spos", this.getPos(ev.target.id));
    },

    allowDrop: function(ev) {
        ev.preventDefault();
    },

    drop: function (ev) {

        var data = ev.dataTransfer.getData("sid");
        let sourceId = data.replace('s_','r_');
        let targetId = this.getTextId(ev.target);
        let oldPos = ev.dataTransfer.getData("spos");
        $("#"+targetId).after($("#"+sourceId));
        let newPos = this.getPos(data);
        var comObj = {"action" : "story/reorder", "type": "post", "data" : {"storyId" : data, "oldPos" : oldPos, "newPos": newPos}};
        ev.preventDefault();
        updateCMS(comObj);
    },

    getPos: function(sid) {
      let rId = sid.replace('s_','r_');
      let parent = $("#"+rId).parent();
      let rows = $(parent).find(".headline");
      let rIndex = -1;
      $.each(rows, function(index, row) {
        if ($(row).attr('id') == sid) {
          rIndex = index;
        };
      });
      return rIndex;
    },

    getTextId: function (node) {
      let parentId = node.parentNode.id;
      let parent = node.parentNode;
      if (!parentId || parentId == '') {
        parentId = parent.parentNode.id;
        parent = parent.parentNode;
      }

      if (parentId.startsWith('s_')) {
        parentId = parentId.replace('s_', 'r_');
      }
      return parentId;
    },

    render: function render() {
      //console.log(pageStore.getState().pro);
      var showData = data;
      if (this.state && this.state.pro == 'yes') {
        showData = proData;
      };
      var rows = showData.map( (row, index) => {
            return   React.createElement(
              "div",
             { "id": 'r_'+row.storyid, onDrop: this.drop, onDragOver: this.allowDrop, "key": index },
              React.createElement(
              "div",
              { "id": 's_'+row.storyid, "className": "headline", "story_id": row.storyid, "draggable" : true, onDragStart: this.drag },
              " ",
              row.headline,
              React.createElement("hr", null)
          ));
      });

        return React.createElement(
            "div",
            null,
            React.createElement(
                "table",
                null,
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "div",
                                    {  style: iStyle },
                                    React.createElement("img", { src: "./images/hero3.png", alt: "", width: "700", height: "405" }),
                                    React.createElement(
                                      "div",
                                      { style: tStyle1 },
                                      React.createElement(
                                        "div",
                                        { className: "headline" },
                                      "Amazon Buying "),
                                    ),
                                    React.createElement(
                                      "div",
                                      { style: tStyle2 },
                                      React.createElement(
                                        "div",
                                        { className: "headline" },
                                      "Amazon is buying Whole Foods in a deal valued at $13.7 billion "),
                                    ),
                                )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("div", { className: "image"},
                            React.createElement("img", {  src: "./images/hero1.png" })),

                            React.createElement("hr", null),
                            React.createElement(
                                "div",
                                { collection_id: "cid1" , id :"s123"},
                                rows
                            )
                        )
                    )
                )
            )
        );
    }
});
