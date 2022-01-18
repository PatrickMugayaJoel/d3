const svg = d3.select("#firstandsecond")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);
      
  // Add X axis label:
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width)
  .attr("y", height + margin.top + 20)
  .text("Year");

// Y axis label:
svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left+15)
  .attr("x", -margin.top)
  .text("Percentage Votes")

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
    .attr("fill", d => color(d.key));
