
var data = [{ "when": "2 minutes ago",
"who": "Jill Dupre",
"description": "Created new account"
},
{
"when": "1 hour ago",
"who": "Lose White",
"description": "Added fist chapter"
},
{
"when": "2 hours ago",
"who": "Jordan Whash",
"description": "Created new account"
}];

var rows = data.map(function(row){
return <tr>
<td>{row.when}</td>
<td>{row.who}</td>
<td>{row.description}</td>
</tr>
});

var AppA = React.createClass({
render: function(){
return <App title="MEME"/>
}
});

var App1 = React.createClass({
render: function(){
return <div><img src = "./images/mod1.png"/></div>
}
});

var App2 = React.createClass({
render: function(){
return <div><img src = "./images/mod2.png"/></div>
}
});

var ModA = React.createClass({
render: function(){
return <div><img src = "{this.props.image}"/></div>
}
});
ReactDOM.render(<ModA image='./images/header.png'/>, document.body);

ReactDOM.render(<App title='Recent Changes'/>, document.body);