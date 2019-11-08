import { useQuery } from '@apollo/react-hooks';
import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';

import { EXPENSE_CATEGORY_MAP, GET_EXPENSES } from '../util/gql';
import { ConvertDateToString } from '../util/time';


export default function ListTable (props) {
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
		</Fragment>
	);
}
