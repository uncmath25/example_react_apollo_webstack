import React, { Component } from 'react';

import Header, { TAB_NAME } from './Header'
import Summary from './Summary'
import RecordExpenses from './RecordExpenses'
import ListExpenses from './ListExpenses'


const SUMMARY_PAGE = 'summary';
const RECORD_EXPENSES = 'record_expenses';
const LIST_EXPENSES = 'list_expenses';
const DEFAULT_PAGE = SUMMARY_PAGE;

const TAB_INFO_MAP = {
  [SUMMARY_PAGE]: {
    [TAB_NAME]: 'Summary'
  },
  [RECORD_EXPENSES]: {
    [TAB_NAME]: 'Record Expenses'
  },
  [LIST_EXPENSES]: {
    [TAB_NAME]: 'List Expenses'
  },
}

const PAGE_MAP = {
  [SUMMARY_PAGE]: <Summary />,
  [RECORD_EXPENSES]: <RecordExpenses />,
  [LIST_EXPENSES]: <ListExpenses />
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: PAGE_MAP[DEFAULT_PAGE] };
    this.setPage = this.setPage.bind(this);
  }

  setPage(page) {
    this.setState({currentPage: PAGE_MAP[page]});
  }

  render() {
    return (
      <div className="App">
        <Header tabInfo={TAB_INFO_MAP} setPage={this.setPage}  />
        {this.state.currentPage}
      </div>
    )
  }
}
