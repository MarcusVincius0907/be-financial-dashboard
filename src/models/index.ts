export interface FinancialData {
  financialDataList: Array<FinancialDataItem>;
}

export interface FinancialDataItem {
  id: string;
  done?: boolean;
  description: string;
  value: string;
  lastUpdate: string;
}

export type ExpenseData = Array<FinancialDataItem>;
export type IncomeData = Array<FinancialDataItem>;

export interface MonthlyResult {
  id: string;
  month: string;
  expenseAmount: string;
  incomeAmount: string;
  totalAmount: string;
  lastUpdate: string;
}

export enum SqliteTableNames {
  EXPENSE = "Expense",
  INCOME = "Income",
  MONTHLY_RESULT = "MONTHLY_RESULT",
}
