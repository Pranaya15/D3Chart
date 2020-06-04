import React from "react";
import BarChart from "./src/BarChart";

import { Navbar, Container, Row, Col, NavDropdown } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
    };
    this.chartRef = React.createRef();
  }

  sort = (order) => {
    console.log("order is ", order);
    this.setState({ order: order });
  };
  render() {
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand>Bar chart</Navbar.Brand>
          <NavDropdown title="sort" id="basic-nav-dropdown">
            <NavDropdown.Item onSelect={() => this.sort("asc")}>
              Ascending
            </NavDropdown.Item>
            <NavDropdown.Item onSelect={() => this.sort("desc")}>
              Descending
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <BarChart ref={this.chartRef} order={this.state.order} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
