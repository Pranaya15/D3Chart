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
    if (nextProps.order !== this.props.order) {
      this.state.chart.createBarChart(nextProps.order);
    }
  }
  render() {
    return <div ref={this.barChartRef}></div>;
  }
}
