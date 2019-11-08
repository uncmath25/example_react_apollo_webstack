import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import ListTable from '../components/ListTable';

const paddingStyle = {
  padding: "20px"
}

export default class ListExpenses extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };
 
  handleStartDateChange = newDate => {
    this.setState({
      startDate: newDate
    });
  };

  handleEndDateChange = newDate => {
    this.setState({
      endDate: newDate
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} style={paddingStyle}></Col>
        </Row>
        <Row>
          <Col sm={4}>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleStartDateChange}
            />
          </Col>
          <Col sm={2}></Col>
          <Col sm={4}>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleEndDateChange}
            />
          </Col>
          <Col sm={2}></Col>
        </Row>
        <Row>
          <Col xs={12} style={paddingStyle}></Col>
        </Row>
        <Row>
          <Col xs={12}>
          <ListTable startDate={this.state.startDate} endDate={this.state.endDate} />
          </Col>
        </Row>
      </Container>
    );
  }
}
