import { useQuery } from '@apollo/react-hooks';
import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';

import { EXPENSE_CATEGORY_MAP, EXPENSE_CATEGORY_COLOR_MAP, GET_EXPENSES, BuildCategoryTotals } from '../util/gql';
import { ConvertDateToString } from '../util/time';


export default function SummaryTable (props) {
  const startDate = ConvertDateToString(props.startDate);
	const endDate = ConvertDateToString(props.endDate);
	const categories = Object.values(EXPENSE_CATEGORY_MAP);
	const { data, loading, error } = useQuery(GET_EXPENSES, {
		variables: {startDate, endDate, categories}
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR!</p>;
  const categoryTotals = BuildCategoryTotals(data.getExpenses);
	return (
		<Fragment>
			<Table striped bordered hover>
				<thead>
					<tr>
            {Object.keys(categoryTotals).map(categoryKey => (
              <th key={categoryKey} style={{backgroundColor: EXPENSE_CATEGORY_COLOR_MAP[categoryKey]}}>{categoryKey}</th>
            ))
            }
					</tr>
				</thead>
				<tbody>
          <tr>
            {Object.keys(categoryTotals).map(categoryKey => (
              <td key={categoryKey}>{categoryTotals[categoryKey]}</td>
            ))
            }
          </tr>
				</tbody>
			</Table>
		</Fragment>
	);
};
