
var data = [{ "storyid": "s1d1",
"headline": "Japan's leader just won a resounding election victory, but he's still unpopular"
},
{
"storyid": "sid2",
"headline": "Cryptocurrencies are 'not mature enough' to assess their impact, Saudi regulator says"
},
{
"storyid": "sid3",
"headline": "China's exports to North Korea jumped 20.9% in first three quarters of 2017"
},
{
"storyid": "sid4",
"headline": "Strained French-German ties and a rudderless EU are losing Europe"
}];

var rows = data.map(function(row){
return 
<div class="headline" story_id={row.storyid}> 
	{row.headline} 
	<hr/>
</div>

});

var Hero2 = React.createClass({
render: function(){
return <div>
<table>
<tbody>
<tr>
<td>

    <span itemscope="itemscope" itemtype="https://schema.org/ImageObject">  
          <a href="" class="">  
             <img src="hero1.png" alt="" width="720" height="405"/>   
           </a>
    </span>
</td>
<td><img src="hero1.png"></img><hr/><div collection_id="cid1">{rows}</div></td>
</tr>
</tbody>
</table></div>
}
});


