import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import Pie from 'react-minimal-pie-chart';

import { EXPENSE_CATEGORY_MAP, EXPENSE_CATEGORY_COLOR_MAP, GET_EXPENSES, BuildCategoryTotals } from '../util/gql';
import { ConvertDateToString } from '../util/time';


export default function PieChart (props) {
	const startDate = ConvertDateToString(props.startDate);
	const endDate = ConvertDateToString(props.endDate);
	const categories = Object.values(EXPENSE_CATEGORY_MAP);
	const { data, loading, error } = useQuery(GET_EXPENSES, {
		variables: {startDate, endDate, categories}
  });
	if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR!</p>;
  const categoryTotals = BuildCategoryTotals(data.getExpenses);
  let pieChartData = [];
  Object.keys(categoryTotals).forEach(function (categoryKey) {
    pieChartData.push({
      title: categoryKey,
      value: categoryTotals[categoryKey],
      color: EXPENSE_CATEGORY_COLOR_MAP[categoryKey]
    })
  });
	return (
    <Pie 
      data={pieChartData}
      radius={20}
      cx={50}
      cy={30}
      animate={true}
      animationDuration={300}
    />
	);
}
