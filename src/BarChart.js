import React from "react";
import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.barchartRef = React.createRef();
  }
  componentDidMount() {
    this.createBarChart();
  }

  createBarChart = () => {
    const dataSet1 = [
      { label: "1990", value: 16 },
      { label: "1991", value: 56 },
      { label: "1992", value: 7 },
      { label: "1993", value: 77 },
      { label: "1994", value: 22 },
      { label: "1995", value: 16 },
    ];

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(dataSet1, (data) => data.value)])
      .range([HEIGHT, 0]);

    let x = d3
      .scaleBand()
      .domain(dataSet1.map((data) => data.label))
      .range([0, WIDTH])
      .padding(0.4);

    let svg = d3
      .select(this.barchartRef.current)
      .append("svg")
      .style("overflow", "visible")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .style("border", "2px solid gray")
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

    let xAxisCall = d3.axisBottom(x);
    svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`)
      .call(xAxisCall);

    let yAxisCall = d3.axisLeft(y);
    svg.append("g").call(yAxisCall);

    svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("text-anchor", "middle")
      .text("Year");

    svg
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -30)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Values");

    let rects = svg.selectAll("rect").data(dataSet1).enter().append("rect");
    rects
      .attr("x", (data) => x(data.label))
      .attr("y", (data) => y(data.value))
      .attr("width", x.bandwidth)
      .attr("height", (data) => HEIGHT - y(data.value)) ///actually we should decrease from y but decrease from here because we have changeg y -axis cordinates 0 from top to bottom
      .attr("fill", "green");
  };
  render() {
    return <div ref={this.barchartRef}></div>;
  }
}

export default BarChart;
