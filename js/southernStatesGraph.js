//Defining margin values
var margin={top:40, bottom:100, left:150, right:50},
    width=1200-margin.left-margin.right,
    height=600-margin.top-margin.bottom;


 //Defining scales
var horizontal=d3.scale.ordinal().rangeRoundBands([0,width],0.5),
    vertical=d3.scale.linear().rangeRound([height,0]);
var color = d3.scale.category20c();


//defining x and y axis
var xAxis=d3.svg.axis()
  .scale(horizontal)
  .orient("bottom");
var yAxis=d3.svg.axis()
  .scale(vertical)
  .orient("left");

var svg=d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

d3.json("json/southernStates.json",function(err,data){
  data.forEach(function(d){
    d["Particulars"]=d["Particulars"];
    /*d["3-1993"]=d["3-1993"];
    d["3-1994"]=d["3-1994"];
    d["3-1995"]=d["3-1995"];
    d["3-1996"]=d["3-1996"];
    d["3-1997"]=d["3-1997"];
    d["3-1998"]=d["3-1998"];
    d["3-1999"]=d["3-1999"];
    d["3-2000"]=d["3-2000"];
    d["3-2001"]=d["3-2001"];
    d["3-2002"]=d["3-2002"];*/
    d["3-2003"]=d["3-2003"];
    d["3-2004"]=d["3-2004"];
    d["3-2005"]=d["3-2005"];
    d["3-2006"]=d["3-2006"];
    d["3-2007"]=d["3-2007"];
    d["3-2008"]=d["3-2008"];
    d["3-2009"]=d["3-2009"];
    d["3-2010"]=d["3-2010"];
    d["3-2011"]=d["3-2011"];
    d["3-2012"]=d["3-2012"];
    d["3-2013"]=d["3-2013"];
    d["3-2014"]=d["3-2014"];
  });
var xData=[/*"3-1993","3-1994","3-1995","3-1996","3-1997","3-1998","3-1999","3-2000","3-2001","3-2002",*/"3-2003",
                                  "3-2004","3-2005","3-2006","3-2007","3-2008","3-2009","3-2010","3-2011","3-2012","3-2013","3-2014"];
var dataIntermediate = xData.map(function (c) {
      return data.map(function (d) {
          return {x: d["Particulars"], y: d[c]};
      });
});
var dataStackLayout = d3.layout.stack()(dataIntermediate);
horizontal.domain(dataStackLayout[0].map(function (d) {
      return d.x;
  }));
vertical.domain([0,
      d3.max(dataStackLayout[dataStackLayout.length - 1],
                function (d) { return d.y0 + d.y;})
    ])
    .nice();
var layer = svg.selectAll(".stack")
        .data(dataStackLayout)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
              return color(i);
        });
layer.selectAll("rect")
      .data(function (d) {
          return d ;
      })
      .enter().append("rect")
      .attr("x", function (d) {
          return horizontal(d.x);
        })
        .attr("y", function (d) {
            return vertical(d.y + d.y0);
        })
        .attr("height", function (d) {
            return vertical(d.y0) - vertical(d.y + d.y0);
      })
    .attr("width", horizontal.rangeBand());
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (height)+ ")")
    .call(xAxis)
    .style('fill', 'orange')
    .selectAll("text")
     .attr("y", 15)
    .attr("x", -40)
    .attr("transform", "rotate(10)")
    .style("text-anchor", "start");

svg.append("g")
  .attr("class", "axis")
  .call(yAxis)
  .style('fill', 'orange')
  .append("text")
     .attr("transform", "rotate(-90)")
     .attr("dy","1em")
     .style("text-anchor", "end")
     .style("font-size","15px")
     .style("font-weight","bold")
     .style("color","orange")
     .text("K/Ha");
     var legend = svg.selectAll(".legend")
       .data(color.domain().slice())
     .enter().append("g")
       .attr("class", "legend")
       .attr("transform", function(d, i) { return "translate(0," + i * 25 +")"; });
   legend.append("rect")
       .attr("x", width - 18)
       .attr("width", 18)
       .attr("height", 18)
       .style("fill", color);
   legend.append("text")
       .attr("x", width - 24)
       .attr("y", 9)
       .attr("dy", ".35em")
       .style("text-anchor", "end")
       .style("fill","orange")
       .style("font-size","15px")
       .text(function(d,i) { return xData[i]; });
});
