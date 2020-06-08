//import React from "react";
import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;
const dataSet1 = [
  { label: "1990", value: 16 },
  { label: "1991", value: 56 },
  { label: "1992", value: 7 },
  { label: "1993", value: 77 },
  { label: "1994", value: 22 },
  { label: "1995", value: 16 },
];

export default class BarChart {
  constructor(barchartRef) {
    this.svg = d3
      .select(barchartRef)
      .append("svg")
      .style("overflow", "visible")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .style("border", "2px solid gray")
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

    this.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("text-anchor", "middle")
      .text("Year");

    this.svg
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -30)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Values");

    this.xAxisGroup = this.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);

    this.yAxisGroup = this.svg.append("g");

    this.createBarChart("asc");
  }

  createBarChart(order) {
    console.log("this.svg", this.svg);
    let sortData = [...dataSet1];
    let data =
      order === "desc"
        ? sortData.sort((a, b) => d3.descending(a.label, b.label))
        : sortData.sort((a, b) => d3.ascending(a.label, b.label));

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([HEIGHT, 0]);
    console.log("y linear scale", y);

    let x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, WIDTH])
      .padding(0.4);

    // let svg = d3
    //   .select(this.barchartRef.current)
    //   .append("svg")
    //   .style("overflow", "visible")
    //   .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    //   .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    //   .style("border", "2px solid gray")
    //   .append("g")
    //   .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

    let xAxisCall = d3.axisBottom(x);

    this.xAxisGroup.call(xAxisCall);

    let yAxisCall = d3.axisLeft(y);
    //   .tickValues(data.map((d) => d.value))

    this.yAxisGroup.call(yAxisCall);

    // this.svg
    //   .append("text")
    //   .attr("x", WIDTH / 2)
    //   .attr("y", HEIGHT + 40)
    //   .attr("text-anchor", "middle")
    //   .text("Year");

    // this.svg
    //   .append("text")
    //   .attr("x", -HEIGHT / 2)
    //   .attr("y", -30)
    //   .attr("text-anchor", "middle")
    //   .attr("transform", "rotate(-90)")
    //   .text("Values");

    let rects = this.svg.selectAll("rect").data(data);

    rects
      .transition()
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth)
      .attr("height", (d) => HEIGHT - y(d.value));

    rects
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth)
      .attr("height", (d) => HEIGHT - y(d.value))
      .attr("fill", "green");
  }
}
