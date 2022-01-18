// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 40, left: 50},
    width = 1250 - margin.left - margin.right,
    height = 640 - margin.top - margin.bottom;

var data = [];
let xaxis = 140000;
let yaxis = 70000;


//Read the data
d3.csv("MPS_RESULTS_2021-converted.csv", function(dat) {
  xaxis = 420;
  yaxis = 110000;
  data = dat;draw(xaxis, yaxis);
});

const draw = (X_Axis, Y_Axis) => {
  
// append the svg object to the body of the page
var Svg = d3.select("#my_dataviz2").html("")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")

  // Add X axis
  var x = d3.scaleLinear()
    .domain([1, X_Axis])
    .range([ 0, width ])
  Svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(-height*1.3).ticks(10))
    .select(".domain").remove()

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, Y_Axis])
    .range([ height, 0])
    .nice()
  Svg.append("g")
    .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(7))
    .select(".domain").remove()

  // Customization
  Svg.selectAll(".tick line").attr("stroke", "#EBEBEB")

  // Add X axis label:
  Svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("Constituency IDs");

  // Y axis label:
  Svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+20)
      .attr("x", -margin.top)
      .text("Candidate Votes")

  // Color scale: give me a specie name, I return a color
  var color = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica" ])
    .range([ "#FFFF00", "#0000FF", "#ff0000", "#808080", "#964B00", "#ffa500", "#402D54", "#D18975", "#8FD175", "#000000", "#000000"])

  // create a tooltip
  const tooltip = d3.select("#my_dataviz2")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("width", "300px")
    .style("float", "right")

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event,d) {
    tooltip.style("opacity", 1)
  }
  const mousemove = function(d, xx, event) {
    // console.log(event[xx])
    tooltip
      .html(
        "<table><tr><td><b>Constituency</b></td><td>" + d.Constituency + "</td></tr>"+
        "<table><tr><td><b>Candidate's Votes</b></td><td>" + d.Name + "</td></tr>"+
        "<tr><td><b>Political Party</b></td><td>" + d["Political Party"] + "</td></tr>" +
        "<tr><td><b>Votes</b></td><td>" + d.Votes + "</td></tr>" 
        )
      .style("left", event[xx].attributes.cx + 15 + "px")
      .style("top", event[xx].attributes.cy + "px")
  }
  const mouseleave = function(d) {
    // tooltip.style("opacity", 0)
  }

  // Add dots
  Svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.ID); } )
      .attr("cy", function (d) { return y(d.Votes); } )
      .attr("r", 5)
      .style("fill", function (d) { return color(d.Constituency) } )
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
}

d3.select('#xaxis').on('change', function() {
  xaxis = this.value;
  draw(xaxis, yaxis);
});

d3.select('#yaxis').on('change', function() {
  yaxis = this.value;
  draw(xaxis, yaxis);
});
