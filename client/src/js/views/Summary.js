import { Query } from '@apollo/react-components';
import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../../css/custom_datepicker.css";

import PieChart from '../components/PieChart';
import SummaryTable from '../components/SummaryTable';
import { EXPENSE_CATEGORY_MAP, QUALIFIED_EXPENSE_CATEGORY_KEYS, GET_EXPENSES } from '../util/gql';
import { GetWeekStart, GetWeekEnd } from '../util/time';

const paddingStyle = {
  padding: '20px'
}

export default class Summary extends Component {
  state = {
    startDate: GetWeekStart(new Date()),
    endDate: GetWeekEnd(new Date())
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
      <Query query={GET_EXPENSES}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>ERROR!</p>;
          const qualifiedTotal = this.getQualifiedTotal(data.getExpenses);
          return (
            <Container>
              <Row>
                <Col xs={12} style={paddingStyle}></Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleStartDateChange}
                  />
                </Col>
                <Col sm={3}></Col>
                <Col sm={2}>
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleEndDateChange}
                    dateFormat="MMMM dd, yyyy"
                    className="custom-react-datepicker"
                  />
                </Col>
                <Col sm={3}></Col>
                <Col sm={2}>
                  {qualifiedTotal}
                </Col>
              </Row>
              <Row>
                <Col xs={12} style={paddingStyle}></Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <SummaryTable startDate={this.state.startDate} endDate={this.state.endDate} />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <PieChart startDate={this.state.startDate} endDate={this.state.endDate} />
                </Col>
              </Row>
            </Container>
          )
        }}
      </Query>
    );
  }

  getQualifiedTotal(expenses) {
    let qualifiedTotal = 0;
    expenses.forEach(function (record) {
      QUALIFIED_EXPENSE_CATEGORY_KEYS.forEach(function (categoryKey) {
        if (EXPENSE_CATEGORY_MAP[categoryKey] === record.expense.category) {
          qualifiedTotal += record.expense.cost
        }
      });
    });
    return qualifiedTotal;
  }
}
