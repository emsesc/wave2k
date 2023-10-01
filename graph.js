let frequency_data = d3.csv

class graphVis {
    constructor(year, frequency_to_vis) {
        this.data = frequency_to_vis;
        this.div_id = div_id;

    }

    render() {
        let graph = d3.select('#'+this.div_id);

        let data_points = graph.selectAll("")
    }
}