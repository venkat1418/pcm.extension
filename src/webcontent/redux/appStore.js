import { createStore } from 'redux';

const nonProList = [
  { "storyid": "s1d1",
    "headline": "Japan's leader just won a resounding election victory, but he's still unpopular"
  },
  {
    "storyid": "sid2",
    "headline": "Cryptocurrencies are 'not mature enough' to assess their impact"
  },
  {
    "storyid": "sid3",
    "headline": "China's exports to North Korea jumped 20.9% in first three quarters of 2017"
  }
];

const proList = [
  { "storyid": "s1d1",
    "headline": "[PRO] Japan's leader just won a resounding election victory, but he's still unpopular"
  },
  {
    "storyid": "sid2",
    "headline": "[PRO] Cryptocurrencies are 'not mature enough' to assess their impact"
  },
  {
    "storyid": "sid3",
    "headline": "[PRO] China's exports to North Korea jumped 20.9% in first three quarters of 2017"
  }
];


const classTypes = {
  classType1 : "default",
  classType2 : "first",
  classType3 : "second"
};
const heroData = {
  heroImage: "images/hero3.png",
  heroImage2:"images/Imra.jpg",
  heroEyeBrow: "Amazon Buying",
  heroHeadline: "Amazon is buying Whole Foods in a deal valued at $13.7 billion"
};
const heroLists = [
  { "storyid": "s1d11",
    "title": "HERO PACKAGE LEAD",
    "headline": "President Trump:'Hurricane is of proportion,' but the government is ready"
  },
  {
    "storyid": "s1d2",
    "title": "HERO PACKAGE POSITION 1",
    "headline": "Hurricane Irma will 'devastate' parts of the United States, FEMA"
  },
  {
    "storyid": "s1d3",
    "title": "HERO PACKAGE POSITION 2",
    "headline": "After hitting Florida, Hurricane irma on track to strike world's busiest airport"
  },
  {
    "storyid": "s1d4",
    "title": "HERO PACKAGE POSITION 3",
    "headline": "Home Depot is retail's bright spot as it courts younger shoppers who prefer DIY"
  }
];

const topStories = [
  { "storyid": "b000",
    "title": "POSITION 1",
    "headline": "Putin voices hope for cooperation with US in letter to Trump"
  },
  {
    "storyid": "b001",
    "title": "POSITION 2",
    "headline": "China to cap overseas withdrawals using domestic bank cards"
  },
  {
    "storyid": "b002",
    "title": "POSITION 3",
    "headline": "Russian tankers fueled North Korea via transfers at sea"
  },
  {
    "storyid": "b003",
    "title": "POSITION 4",
    "headline": "Airbus confirms $50 billion jet order, one of the biggest aviation deals in history"
  },
  { "storyid": "b004",
    "title": "POSITION 5",
    "headline": "North Korea says won’t give up nukes if US keeps up ‘blackmail’"
  },
  {
    "storyid": "b005",
    "title": "POSITION 6",
    "headline": "Trump's reset with Russia is a flop so far"
  },
  {
    "storyid": "b006",
    "title": "POSITION 7",
    "headline": "A German court ordered Amazon not to pull in customers who can't spell 'Birkenstock'"
  }
];

const layoutLists = [
  { "storyid": "s1l1",
    "src": "images/layout2.png",
    "description": "HERO W/DECK",
    "noOfStories": "6 STORIES"
  },
  {
    "storyid": "s1l2",
    "src": "images/layout2.png",
    "description": "HERO W/O TOP STORIES LABEL",
    "noOfStories": "7 STORIES"
  },
  {
    "storyid": "s1l3",
    "src": "images/layout3.png",
    "description": "HERO PACKAGES",
    "noOfStories": "3/4 PACKAGE + 5 STORIES"
  },
  {
    "storyid": "s1l4",
    "src": "images/layout4.png",
    "description": "HERO 2-UP PACKAGES",
    "noOfStories": "2 3/4 PACKAGES"
  },
  {
    "storyid": "s1l5",
    "src": "images/layout5.png",
    "description": "WORLD ON FIRE",
    "noOfStories": "1 STORY"
  },
  { "storyid": "s1l6",
    "src": "images/layout6.png",
    "description": "HERO W/DECK",
    "noOfStories": "6 STORIES"
  },
  {
    "storyid": "s1l7",
    "src": "images/layout2.png",
    "description": "WORLD ON FIRE W/BULLETS",
    "noOfStories": "1 STORY"
  },
  {
    "storyid": "s1l8",
    "src": "images/layout2.png",
    "description": "HERO W/O TOP STORIES LABEL",
    "noOfStories": "7 STORIES"
  },
  {
    "storyid": "s1l9",
    "src": "images/layout3.png",
    "description": "HERO PACKAGES",
    "noOfStories": "3/4 PACKAGE + 5 STORIES"
  },
  {
    "storyid": "s1l10",
    "src": "images/layout2.png",
    "description": "HERO 2-UP PACKAGES",
    "noOfStories": "2 3/4 PACKAGES"
  },
  {
    "storyid": "s1l11",
    "src": "images/layout5.png",
    "description": "WORLD ON FIRE",
    "noOfStories": "11 STORY"
  },
  {
    "storyid": "s1l12",
    "src": "images/layout6.png",
    "description": "WORLD ON FIRE W/BULLETS",
    "noOfStories": "12 STORY"
  },
  {
    "storyid": "s1l13",
    "src": "images/layout2.png",
    "description": "HERO W/O TOP STORIES LABEL",
    "noOfStories": "7 STORIES"
  },
  {
    "storyid": "s1l14",
    "src": "images/layout3.png",
    "description": "HERO PACKAGES",
    "noOfStories": "3/4 PACKAGE + 5 STORIES"
  },
  {
    "storyid": "s1l15",
    "src": "images/layout4.png",
    "description": "HERO 2-UP PACKAGES",
    "noOfStories": "2 3/4 PACKAGES"
  },
  {
    "storyid": "s1l16",
    "src": "images/layout5.png",
    "description": "WORLD ON FIRE",
    "noOfStories": "1 STORY"
  },
  { "storyid": "s1l17",
    "src": "images/layout6.png",
    "description": "HERO W/DECK",
    "noOfStories": "6 STORIES"
  },
  {
    "storyid": "s1l18",
    "src": "images/layout2.png",
    "description": "WORLD ON FIRE W/BULLETS",
    "noOfStories": "1 STORY"
  },
  {
    "storyid": "s1l19",
    "src": "images/layout2.png",
    "description": "HERO W/O TOP STORIES LABEL",
    "noOfStories": "7 STORIES"
  },
  {
    "storyid": "s1l20",
    "src": "images/layout3.png",
    "description": "HERO PACKAGES",
    "noOfStories": "3/4 PACKAGE + 5 STORIES"
  },
  {
    "storyid": "s1l21",
    "src": "images/layout2.png",
    "description": "HERO 2-UP PACKAGES",
    "noOfStories": "2 3/4 PACKAGES"
  },
  {
    "storyid": "s1l22",
    "src": "images/layout5.png",
    "description": "WORLD ON FIRE",
    "noOfStories": "11 STORY"
  },
  {
    "storyid": "s1l23",
    "src": "images/layout6.png",
    "description": "WORLD ON FIRE W/BULLETS",
    "noOfStories": "12 STORY"
  }
];

const h2LeftStories = [
  { "storyid": "b007",
    "src": "images/stock.png",
    "headline": "Verizon to incur $500 million in pre-tax costs from Yahoo deal",
    "author": "Christine Wang ",
    "timeOfEntry":" 9 MIN AGO"
  },
  {
    "storyid": "b008",
    "src": "images/bannon.png",
    "headline": "This is war:Here are the likely names on Bannon's short list",
    "author": "Christine Wang ",
    "timeOfEntry":" 9 MIN AGO"
  },
  {
    "storyid": "b009",
    "src": "images/hillary.png",
    "headline": "$2 trillion man? Market value added since Trump's election win passes milestone",
    "author": "Christine Wang ",
    "timeOfEntry":" 9 MIN AGO"
  }
];

const emptyStories = [
  {
    "headline": "Add Story",
  },
  {
    "headline": "Add Story",
  },
  {
    "headline": "Add Story",
  }
];

const h2RightStories = [
  { "storyid": "b010",
    "headline": "'Money' Mayweather wants McGregor fight to pay off huge tax bill"
  },
  {
    "storyid": "b011",
    "headline": "Cramer on Nike CEO:'Mark Parker is the wolf in sheep's clothing'"
  },
  {
    "storyid": "b012",
    "headline": "Irma is now sprawling across 6 states, bringing flooding to some"
  },
  {
    "storyid": "b013",
    "headline": "Home sales drop again in July and will continue 'unless supply miraculously improves'"
  }
];

const nonProData = {
    stories : [
      ...nonProList
    ],
    leftHero : [
      ...heroLists
    ], leftTop :[
      ...topStories
    ], layout:[
      ...layoutLists
    ], h2Left:[
      ...h2LeftStories
    ], h2Right:[
      ...h2RightStories
    ],...classTypes,
    ...heroData
};

const proData = {
    stories : [
      ...proList
    ],
    leftHero : [
      ...heroLists
    ], layout:[
      ...layoutLists
    ], leftTop :[
      ...topStories
    ], h2Left:[
      ...h2LeftStories
    ], h2Right:[
      ...h2RightStories
    ], ...classTypes,
    ...heroData
};

function reducer(state, action) {
  if (action.type === 'SET_PRO') {
    return {
      proState: 'yes',
      data : proData
    };
  } else if (action.type === 'UNSET_PRO') {
    return {
      proState: 'no',
      data : nonProData
    };
  } else if (action.type === 'SHOW_BUTTONS') {
    return {
      proState: 'no',
      data : nonProData,
      isLogin: true
    };
  } else if (action.type === 'HIDE_BUTTONS') {
    return {
      proState: 'no',
      data : nonProData,
      isLogin: false
    };
  } else if (action.type === 'LOAD_DATA') {
    let newNonProData = {
        stories : [
          ...state.data.stories
        ],
        leftHero : [
          ...action.data.slice(0, 1),
          ...emptyStories
        ], leftTop :[
          ...action.data.slice(1, 6)
        ], layout:[
          ...layoutLists
        ], h2Left:[
          ...action.data.slice(6, 9)
        ], h2Right:[
          ...action.data.slice(9, 12)
        ],...classTypes,
        ...heroData
    };
    return {
      proState: 'no',
      data : newNonProData,
      isLogin: false
    };
  } else {
    return state;
  }
}

const initialState = { proState: 'no', data : nonProData, isLogin : false};

const store = createStore(reducer, initialState);

export default store;
