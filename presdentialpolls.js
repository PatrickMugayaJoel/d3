// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 30, left: 30},
  width = 450 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#presdentialpolls")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Build X scales and axis:
const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(myXs)
  .padding(0.01);
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x))

// Build X scales and axis:
const y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myYs)
  .padding(0.01);
svg.append("g")
  .call(d3.axisLeft(y));

// Build color scale
const myColor = d3.scaleLinear()
  .range(["white", "#4C4E52"])
  .domain([1,100])

// //Read the data
// // d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv").then( function(data) {

// // create a tooltip
//   const tooltip = d3.select("#presdentialpolls")
//     .append("div")
//     .style("opacity", 0)
//     .attr("class", "tooltip")
//     .style("background-color", "white")
//     .style("border", "solid")
//     .style("border-width", "2px")
//     .style("border-radius", "5px")
//     .style("padding", "5px")
//     .style("position", "absolute")

//   // Three function that change the tooltip when user hover / move / leave a cell
//   const mouseover = function(event,d) {
//     tooltip.style("opacity", 1)
//   }
//   const mousemove = function(event,d) {
//     tooltip
//       .html("The exact value of<br>this cell is: " + d["KYAGULANYI SSENTAMU ROBERT"][1])
//       .style("left", event.x + 15 + "px")
//       .style("top", event.y + "px")
//   }
//   const mouseleave = function(d) {
//     tooltip.style("opacity", 0)
//   }

//   // add the squares
//   svg.selectAll()
//     .data(data2, function(d) {return d.x+':'+d.y;})
//     .enter()
//     .append("rect")
//       .attr("x", function(d) { return x(d.x) })
//       .attr("y", function(d) { return y(d.y) })
//       .attr("width", x.bandwidth() )
//       .attr("height", y.bandwidth() )
//       .style("fill", function(d) { return myColor(d["KYAGULANYI SSENTAMU ROBERT"][1])} )
//     .on("mouseover", mouseover)
//     .on("mousemove", mousemove)
//     .on("mouseleave", mouseleave)
// // console.log(data2)
// // })