// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 100, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var comparison_data = [
    {
        "year":"2021",
        "first":Math.round((6042898/10744319)*100),
        "second":Math.round((3631437/10744319)*100),
        "third":Math.round((3031437/10744319)*100)
    },
    {
        "year":"2016",
        "first":Math.round((5971872/10329131)*100),
        "second":Math.round((3508687/10329131)*100),
        "third":Math.round((2631437/10744319)*100)
    },
    {
        "year":"2011",
        "first":Math.round((5428369/8272760)*100),
        "second":Math.round((2064963/8272760)*100),
        "third":Math.round((3931437/10744319)*100)
    },
    {
        "year":"2006",
        "first":Math.round((4109449/7230456)*100),
        "second":Math.round((2592954/7230456)*100),
        "third":Math.round((4631437/10744319)*100)
    },
    {
        "year":"2001",
        "first":Math.round((5123360/7576144)*100),
        "second":Math.round((2055795/7576144)*100),
        "third":Math.round((2631437/10744319)*100)
    }
]
comparison_data.columns = ["year", "first", "second", "third"]


const svg = d3.select("#mps")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

// create a tooltip
const tooltip = d3.select("#mps")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")
  .style("position", "absolute")

// List of subgroups = header of the csv files = soil condition here
const subgroups = comparison_data.columns.slice(1)

// List of groups = species here = value of the first column called group -> I show them on the X axis
const groups = comparison_data.map(d => d.year)

// Add X axis
const x = d3.scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.2])
svg.append("g")
.attr("transform", `translate(0, ${height})`)
.call(d3.axisBottom(x).tickSize(0));

// Add Y axis
const y = d3.scaleLinear()
.domain([0, 100])
.range([ height, 0 ]);
svg.append("g")
.call(d3.axisLeft(y));

// Another scale for subgroup position?
const xSubgroup = d3.scaleBand()
.domain(subgroups)
.range([0, x.bandwidth()])
.padding([0.05])

// color palette = one color per subgroup
const color = d3.scaleOrdinal()
.domain(subgroups)
.range(['#e41a1c','#377eb8','#4daf4a'])

// Three function that change the tooltip when user hover / move / leave a cell
const mouseover = function(event,d) {
  tooltip.style("opacity", 1)
}
const mousemove = function(event,d) {
  tooltip
    .html(
      "<table><tr><td><b>Candidate's Votes</b></td><td>test1</td></tr>" +
      "<tr><td><b>Invalid Votes</b></td><td>test2</td></tr>" +
      "<tr><td><b>Total Votes</b></td><td>test3</td></tr></table>"
      )
    .style("left", event.x + 15 + "px")
    .style("top", event.y + "px")
}
const mouseleave = function(d) {
  tooltip.style("opacity", 0)
}

// Show the bars
svg.append("g")
.selectAll("g")
// Enter in data = loop group per group
.data(comparison_data)
.join("g")
    .attr("transform", d => `translate(${x(d.year)}, 0)`)
.selectAll("rect")
.data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
.join("rect")
    .attr("x", d => xSubgroup(d.key))
    .attr("y", d => y(d.value))
    .attr("width", xSubgroup.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", d => color(d.key))
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
