	const svgs = [];
	const axises1 = [];
	const axises2 = [];

	Object.keys(candidate_votes_per_year).map(function(key1, index1) {
		// append the svg object to the body of the page
		svgs.push(d3.select("#x"+key1)
		  .append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", `translate(${margin.left},${margin.top})`));

		// X axis
		axises1.push(d3.scaleBand()
		  .range([ 0, width ])
		  .domain(candidate_votes_per_year[key1].map(d => d.candidate))
		  .padding(0.2));
		svgs[index1].append("g")
		  .attr("transform", `translate(0, ${height})`)
		  .call(d3.axisBottom(axises1[index1]))
		  .selectAll("text")
		    .attr("transform", "translate(-10,0)rotate(-45)")
		    .style("text-anchor", "end");

		// Add Y axis
		axises2.push(d3.scaleLinear()
		  .domain([0, 6500000])
		  .range([ height, 0]));
		svgs[index1].append("g")
		  .call(d3.axisLeft(axises2[index1]));

		// Bars
		svgs[index1].selectAll("mybar")
		  .data(candidate_votes_per_year[key1])
		  .join("rect")
		    .attr("x", d => axises1[index1](d.candidate))
		    .attr("y", d => axises2[index1](d.votes))
		    .attr("width", axises1[index1].bandwidth())
		    .attr("height", d => height - axises2[index1](d.votes))
		    .attr("fill", "#69b3a2")
	 });
