import gql from 'graphql-tag';


export const EXPENSE_CATEGORY_MAP = {
  'Grocery': 'GROCERY',
  'Living Essentials': 'LIVING_ESSENTIALS',
  'Dining': 'DINING',
  'Shopping & Entertainment': 'SHOPPING_AND_ENTERTAINMENT',
  'Special': 'SPECIAL'
};

export const EXPENSE_CATEGORY_COLOR_MAP = {
  'Grocery': '#187507',
  'Living Essentials': '#D4DE14',
  'Dining': '#C7243C',
  'Shopping & Entertainment': '#1812B8',
  'Special': '#333B47'
};

export const QUALIFIED_EXPENSE_CATEGORY_KEYS = [
  'Grocery',
  'Living Essentials',
  'Dining',
  'Shopping & Entertainment',
];

export const GET_EXPENSES = gql`
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

export function BuildCategoryTotals(expenses) {
  let categoryTotals = {};
	Object.keys(EXPENSE_CATEGORY_MAP).forEach(function (categoryKey) {
		categoryTotals[categoryKey] = 0
	});
	expenses.forEach(function (record) {
		Object.keys(EXPENSE_CATEGORY_MAP).forEach(function (categoryKey) {
      if (EXPENSE_CATEGORY_MAP[categoryKey] === record.expense.category) {
        categoryTotals[categoryKey] += record.expense.cost
      }
		});
  });
  return categoryTotals;
}
