import React from 'react';
import { Redirect } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/Header';
import Summary from './views/Summary';
import RecordExpenses from './views/RecordExpenses';
import ListExpenses from './views/ListExpenses';


const SUMMARY = 'summary';
const RECORD_EXPENSES = 'record_expenses';
const LIST_EXPENSES = 'list_expenses';
const DEFAULT = SUMMARY;

const VIEW_NAME_MAP = {
  [SUMMARY]: 'Summary',
  [RECORD_EXPENSES]: 'Record Expenses',
  [LIST_EXPENSES]: 'List Expenses'
};
const VIEW_COMPONENT_MAP = {
  [SUMMARY]: Summary,
  [RECORD_EXPENSES]: RecordExpenses,
  [LIST_EXPENSES]: ListExpenses
};

export default function App() {
  return (
    <BrowserRouter>
      <Header viewNameMap={VIEW_NAME_MAP} />
      <Switch>
        <Route exact path="/">
          <Redirect to={'/' + DEFAULT} />
        </Route>
        {Object.keys(VIEW_COMPONENT_MAP).map(
          t => <Route key={t} path={'/' + t} component={VIEW_COMPONENT_MAP[t]} />
        )}
      </Switch>
    </BrowserRouter>
  )
}
