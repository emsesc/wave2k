let song_data = [{"": 1,"Year": 2000 ,"Total_Count": 297,"Nostalgia_Index": 0.798387096774194},
{"": 2,"Year": 2001 ,"Total_Count": 234,"Nostalgia_Index": 0.629032258064516},
{"": 3,"Year": 2002 ,"Total_Count": 268,"Nostalgia_Index": 0.720430107526882},
{"": 4,"Year": 2003 ,"Total_Count": 372,"Nostalgia_Index": 1.0},
{"": 5,"Year": 2004 ,"Total_Count": 372,"Nostalgia_Index": 0.731182795698925},
{"": 6,"Year": 2005 ,"Total_Count": 252,"Nostalgia_Index": 0.67741935483871},
{"": 7,"Year": 2006 ,"Total_Count": 291,"Nostalgia_Index": 0.782258064516129},
{"": 8,"Year": 2007 ,"Total_Count": 308,"Nostalgia_Index": 0.827956989247312},
{"": 9,"Year": 2008 ,"Total_Count": 237,"Nostalgia_Index": 0.637096774193548},
{"": 10,"Year": 2009 ,"Total_Count": 297,"Nostalgia_Index": 0.798387096774194},
{"": 11,"Year": 2010 ,"Total_Count": 278,"Nostalgia_Index": 0.747311827956989},]

class MeetingVis {

    constructor(svg_id, data_to_vis){
        this.data = data_to_vis;
        this.svg_id = svg_id;
    }

        render() {
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 800;
        const height = 600;

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        //get svg elem
        let svg = d3.select("#"+this.svg_id);
        
        svg.style("background-color", "transparent")

        let x = d3.scaleLinear()
		.domain([2000,2010])
		.range([margin.left, width - margin.right]);
        
	
	    let y = d3.scaleLinear()
		.domain([0, 1])
		.range([height - margin.bottom, margin.top]);

        //axes
        let xAxis = svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)   
            .call(d3.axisBottom(x))
            .attr("stroke-width", 1.5)
            

        let yAxis = svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .attr("stroke-width", 1.5)
            


            svg.append("path")
            .datum(this.data)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(d => x(d.Year))
                .y(d => y(d.Nostalgia_Index))
            )

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Nostalgia Index");

            svg.append("text")
                .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
                .style("text-anchor", "middle")
                .text("Year");
        
        let dots = svg.selectAll(".dot").data(this.data, d => d.Nostalgia_Index).join("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.Year))
            .attr("cy", d => y(d.Nostalgia_Index))
            .attr("r", 5)
            .style("fill", "black")
            .attr("data-tippy-content", d => {
                let html = "<table>" 
                + "<tr><th colspan='2'>Total Occurences " + d.Total_Count + "</th></tr>"
                + "</table>"
                return html;
            })
            .call(selection => tippy(selection.nodes(), {allowHTML: true}))
        };



}