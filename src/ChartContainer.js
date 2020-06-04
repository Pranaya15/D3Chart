import React from "react";
import BarChart from "./BarChart";

export default class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.barChartRef = React.createRef();
  }
  componentDidMount() {
    this.setState({
      chart: new BarChart(this.barChartRef.current),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.state.chart.createBarChart(nextProps.order);
  }
  render() {
    return <div ref={this.barChartRef}></div>;
  }
}
