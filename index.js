let freq_data = d3.csv("./data/nostalgia_index.csv");

freq_data = freq_data.map(function(d){
    return d;
});

class graphVis {
    constructor(frequency_to_vis) {
        this.data = frequency_to_vis;
    }

    render() {

        let width = 400;
        let height = 300;

        let svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

            // const xScale = d3.scaleLinear()
            // .domain([1, 5]) // X-axis range
            // .range([0, width]); // Pixel range

        // const yScale = d3.scaleLinear()
        // .domain([0, 25]) // Y-axis range
        // .range([height, 0]); // Pixel range

         // Define the line function
         const line = d3.line()
                .x(d => xScale(d.Year))
                .y(d => yScale(d.Total_Count));

         svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
        
        // let graph = d3.selectAll("svg").data(d3.csv("./data/nostalgia_index.csv")).join("circle")
        //     .attr("y", d => y(d.Total_Count))
        //     .attr("x", d => x(d.Year))

        // let data_points = graph.selectAll("")

        // //Read the data
        // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

        // // When reading the csv, I must format variables:
        // function(d){
        // return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
        // },

        // // Now I can use this dataset:
        // function(data) {

        // // Keep only the 90 first rows
        // data = data.filter(function(d,i){ return i<90})

        // // Add X axis --> it is a date format
        // var x = d3.scaleTime()
        //     .domain(d3.extent(data, function(d) { return d.date; }))
        //     .range([ 0, width ]);
        // svg.append("g")
        //     .attr("transform", "translate(0," + (height+5) + ")")
        //     .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

        // // Add Y axis
        // var y = d3.scaleLinear()
        //     .domain( d3.extent(data, function(d) { return +d.value; }) )
        //     .range([ height, 0 ]);
        // svg.append("g")
        //     .attr("transform", "translate(-5,0)")
        //     .call(d3.axisLeft(y).tickSizeOuter(0));

        // // Add the area
        // svg.append("path")
        //     .datum(data)
        //     .attr("fill", "#69b3a2")
        //     .attr("fill-opacity", .3)
        //     .attr("stroke", "none")
        //     .attr("d", d3.area()
        //     .x(function(d) { return x(d.date) })
        //     .y0( height )
        //     .y1(function(d) { return y(d.value) })
        //     )

        // // Add the line
        // svg.append("path")
        //     .datum(data)
        //     .attr("fill", "none")
        //     .attr("stroke", "#69b3a2")
        //     .attr("stroke-width", 4)
        //     .attr("d", d3.line()
        //     .x(function(d) { return x(d.date) })
        //     .y(function(d) { return y(d.value) })
        //     )

        // // Add the line
        // svg.selectAll("myCircles")
        //     .data(data)
        //     .enter()
        //     .append("circle")
        //     .attr("fill", "red")
        //     .attr("stroke", "none")
        //     .attr("cx", function(d) { return x(d.date) })
        //     .attr("cy", function(d) { return y(d.value) })
        //     .attr("r", 3)

        // })

    }
}