import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


const GET_EXPENSES = gql`
  query GetExpenses {
    getExpenses(startDate: "2017-10-01", endDate: "2017-11-01", categories: ["GROCERY", "DINING"]) {
      id
      expense {
        category
        date
        title
        description
        cost
      }
    }
  }
`

export default class Summary extends Component {
    constructor(props) {
      super(props);
    //   this.state = { tabInfo: props.tabInfo };
    }

    render() {
      return (
        <Query query={GET_EXPENSES}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>ERROR!</p>;
            return (
              <Fragment>
                {data.getExpenses &&
                  data.getExpenses.map(record => (
                    <Fragment key={record.id}>
                      <p>{record.id}: {JSON.stringify(record.expense)}</p>
                    </Fragment>
                  ))
                }
              </Fragment>
            );
          }}
        </Query>
      )
    }
  }
