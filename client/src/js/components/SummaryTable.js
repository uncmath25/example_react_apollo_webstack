import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Table } from 'react-bootstrap';
import gql from 'graphql-tag';

import { EXPENSE_CATEGORY_MAP } from '../util/gql_constants';
import { ConvertDateToString } from '../util/time';


const GET_EXPENSES = gql`
  query GetExpenses($startDate: String, $endDate: String, $categories: [String]) {
    getExpenses(startDate: $startDate, endDate: $endDate, categories: $categories) {
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
`;

export default function SummaryTable (props) {
	const startDate = ConvertDateToString(props.startDate);
	const endDate = ConvertDateToString(props.endDate);
	const categories = Object.values(EXPENSE_CATEGORY_MAP);
	const { data, loading, error } = useQuery(GET_EXPENSES, {
		variables: {startDate, endDate, categories}
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR!</p>;
	return (
		<Fragment>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Category</th>
						<th>Date</th>
						<th>Title</th>
						<th>Description</th>
						<th>Cost</th>
					</tr>
				</thead>
				<tbody>
				{data.getExpenses &&
					data.getExpenses.map(record => (
						<tr key={record.id}>
							<td>{record.id}</td>
							<td>{record.expense.category}</td>
							<td>{record.expense.date}</td>
							<td>{record.expense.title}</td>
							<td>{record.expense.description}</td>
							<td>{record.expense.cost}</td>
						</tr>
					))
				}
				</tbody>
			</Table>
			{startDate}
			{"    "}
			{endDate}
		</Fragment>
	);
}
