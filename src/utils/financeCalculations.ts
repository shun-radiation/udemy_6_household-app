import { Balance, Transactions } from '../types';

export function financeCalculations(transactions: Transactions[]): Balance {
  // { income: 300, expense: 200, balance: 100 }

  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      acc.balance = acc.income + acc.expense;

      return acc;
    },
    {
      income: 0,
      expense: 0,
      balance: 0,
    }
  );
}
