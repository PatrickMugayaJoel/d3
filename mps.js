// set the dimensions and margins of the graph
const margin = {top: 10, right: 10, bottom: 40, left: 55},
  width = (screen.availWidth * 0.78) - margin.left - margin.right,
  height = (screen.availHeight * 0.80) - margin.top - margin.bottom;

let data2 = {};

const myfcn = (grpNm) => {
  grpNm = grpNm || "AMURIA";

  const svg = d3.select("#mps").html("")
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
  const subgroups = [...Array(data2[grpNm].zmap[0]).keys()] // comparison_data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  const groups = data2[grpNm].map(d => d.constituency)

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
  .domain([0, Math.ceil(data2[grpNm].domain)])
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
        "<table><tr><td><b>Name</b></td><td>" + d.Name + "</td></tr>" +
        "<tr><td><b>Party</b></td><td>" + d.Party + "</td></tr>" +
        "<tr><td><b>Votes</b></td><td>" + d.value + "</td></tr></table>"
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
  .data(data2[grpNm])
  .join("g")
      .attr("transform", d => `translate(${x(d.constituency)}, 0)`)
  .selectAll("rect")
  .data(function(d) { 
    return subgroups.map(function(key) {
      if(d[key]) {
        return {
          key: key,
          value: d[key][2],
          Name: d[key][0],
          Party: d[key][1]
        };
      }
    }).filter(elm => !!elm);
  })
  .join("rect")
      .attr("x", d => xSubgroup(d.key))
      .attr("y", d => y(d.value))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", d => color(d.key))
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
}

d3.csv("https://patrickmugayajoel.github.io/d3/mps.csv").then(function(data) { 
  // console.log(data)
  data.forEach((obj) => {
    let grp_name = obj.Constituency.split(" ")[0]
    if(data2[grp_name]){
      let already = data2[grp_name].zmap.indexOf(obj.Constituency);
      if(already > 0) {
        already--;
        const sub_count = Object.keys(data2[grp_name][already]).length;
        data2[grp_name][already][sub_count-1] = [obj["Name"], obj["Political Party"], obj["Votes"]];
        data2[grp_name].zmap[0] > sub_count || (data2[grp_name].zmap[0] = sub_count)
        data2[grp_name].domain > obj["Votes"] || (data2[grp_name].domain = obj["Votes"])
      } else {
        data2[grp_name].push({
          "constituency":obj.Constituency,
          "0":[obj["Name"], obj["Political Party"], obj["Votes"]],
        });
        data2[grp_name].zmap.push(obj.Constituency);
        data2[grp_name].domain > obj["Votes"] || (data2[grp_name].domain = obj["Votes"])
      }
    } else {
      data2[grp_name] = [{
        "constituency":obj.Constituency,
        "0":[obj["Name"], obj["Political Party"], obj["Votes"]],
      }];
      data2[grp_name].zmap = [1, obj.Constituency];
      data2[grp_name].domain = obj["Votes"]
    }
    // data.splice(i, 1);
  });
}).then(() => {
  myfcn()
  const persons = d3.select("#persons").select("ul")
  Object.keys(data2).forEach(function(currentValue){
      persons.append('li').append('a').attr('href', '#').attr('name', currentValue).on("click", clicked).html(currentValue)
  })
});

const clicked = ev => {
  myfcn(ev.target.name);
}

//     var comparison_data = [
//       {
//           "year":"2021",
//           "first":Math.round((6042898/10744319)*100),
//           "third":Math.round((3031437/10744319)*100)
//       },
//       {
//           "year":"2016",
//           "first":Math.round((5971872/10329131)*100),
//           "second":Math.round((3508687/10329131)*100),
//           "third":Math.round((2631437/10744319)*100)
//       },
//       {
//           "year":"2011",
//           "second":Math.round((2064963/8272760)*100),
//           "third":Math.round((3931437/10744319)*100)
//       },
//       {
//           "year":"2006",
//           "third":Math.round((4631437/10744319)*100)
//       },
//       {
//           "year":"2001",
//           "first":Math.round((5123360/7576144)*100),
//           "second":Math.round((2055795/7576144)*100)
//       }
//   ]
//   comparison_data.columns = ["year", "first", "second", "third"]

[
  {
    "0": [
      "OLING JASPER",
      "ANT",
      "47"
    ],
    "1": [
      "TYAN ABEL",
      "ANT",
      "47"
    ],
    "2": [
      "LOLEM MICAH AKASILE",
      "ANT",
      "47"
    ],
    "3": [
      "KIPTERIT CHRISTOPHER",
      "ANT",
      "48"
    ],
    "4": [
      "BAKAN APPOLLO JAMES",
      "ANT",
      "50"
    ],
    "constituency": "AMURIA"
  },
  {
    "0": [
      "ECWERU MUSA FRANCIS",
      "ANT",
      "50"
    ],
    "1": [
      "EDIAU SAMUEL",
      "ANT",
      "50"
    ],
    "2": [
      "AMOLO SIMON PETER",
      "ANT",
      "50"
    ],
    "3": [
      "EKALET BERNARA",
      "ANT",
      "51"
    ],
    "4": [
      "OKURUT CHRISTOPHER",
      "ANT",
      "51"
    ],
    "constituency": "AMURIA COUNTY"
  }
]
