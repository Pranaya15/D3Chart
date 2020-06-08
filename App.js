import React from "react";
import ChartContainer from "./src/ChartContainer";
import styles from "./src/ChartContainer.css";
import { Navbar, Container, Row, Col, NavDropdown } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
    };
  }

  sort = (order) => {
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

        <div className={styles.container}>
          <Row>
            <Col>
              <ChartContainer order={this.state.order} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
