myfc = cad => {// set the dimensions and margins of the graph
  let data2 = [];
  cad = cad || 0;
  var i = data1.length
  const lengt = data1.length
  rt = parseInt(Math.sqrt(i));
  data2.columns = [cadates[cad], 'Station', 'Reg.Voters', 'Valid Votes', 'Invalid Votes', 'Total Votes']
  let the_x = 0;
  while (i--) {
      data2.push(data2.columns.reduce((obj, key) => {
          if (key == 'Station') {
              obj[key] = data1[i][key].replace(/[^a-zA-Z]/g,"");
          } else if(data1[i][key].includes("%")) {
              obj[key] = data1[i][key].substring(0, data1[i][key].length - 1).split(" ");
          } else {
              obj[key] = data1[i][key];
          }
          return obj;
      }, {}));
  
      // data1.splice(i, 1);
  
      if((i%rt) == 0) {
          if(the_x==rt) {
              the_x = 0
          } else {
              the_x=the_x+1
          }
      }
      data2[lengt - (i+1)]['x'] = the_x
      data2[lengt - (i+1)]['y'] = i%rt
  }
  
  const margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 1300 - margin.left - margin.right, // screen.availWidth
    height = 690 - margin.top - margin.bottom; //screen.availHeight

  // append the svg object to the body of the page
  const svg = d3.select("#presdentialpolls").html("")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Build X scales and axis:
  const x = d3.scaleBand()
    .range([ 0, width ])
    .domain([...Array(rt).keys()])
    .padding(0.01);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))

  // Build X scales and axis:
  const y = d3.scaleBand()
    .range([ height, 0 ])
    .domain([...Array(rt).keys()])
    .padding(0.01);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Build color scale
  const myColor = d3.scaleLinear()
    .range(["white", "#4C4E52"])
    .domain([1,100])

  //Read the data
  // d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv").then( function(data) {

  // create a tooltip
  const tooltip = d3.select("#presdentialpolls")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("position", "absolute")

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event,d) {
    tooltip.style("opacity", 1)
  }
  const mousemove = function(event,d) {
    tooltip
      .html(
        "<table><tr><td><b>Candidate's Votes</b></td><td>" + d[cadates[cad]][0] + "</td></tr>" +
        "<tr><td><b>%age Votes</b></td><td>" + d[cadates[cad]][1] + "</td></tr>" +
        "<tr><td><b>Polling Station</b></td><td>" + d["Station"] + "</td></tr>" +
        "<tr><td><b>Reg.Voters</b></td><td>" + d["Reg.Voters"] + "</td></tr>" +
        "<tr><td><b>Valid Votes</b></td><td>" + d["Valid Votes"] + "</td></tr>" +
        "<tr><td><b>Invalid Votes</b></td><td>" + d["Invalid Votes"] + "</td></tr>" +
        "<tr><td><b>Total Votes</b></td><td>" + d["Total Votes"] + "</td></tr></table>"
        )
      .style("left", event.x + 15 + "px")
      .style("top", event.y + "px")
  }
  const mouseleave = function(d) {
    tooltip.style("opacity", 0)
  }

  // add the squares
  svg.selectAll()
    .data(data2, function(d) {return d.x+':'+d.y;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.x) })
      .attr("y", function(d) { return y(d.y) })
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d[cadates[cad]][1])} )
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
  // console.log(data2)
  // })
}