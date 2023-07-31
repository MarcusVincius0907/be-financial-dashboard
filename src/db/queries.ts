import { SqliteTableNames } from "../models";
import db from "./sqlite";

//private

function createTable(tableName: string, fields: Map<string, string>): void {
  try {
    db.run(
      `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${generateQueryByFields(
        fields
      )})`
    );
  } catch (e) {
    console.log("createTable: ", e);
  }
}

function selectAll(tableName): string {
  return db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return "";
    } else {
      return JSON.stringify(rows);
    }
  });
}

function selectById(tableName: string, id: string): string {
  return db.get(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, row) => {
    if (err) {
      console.error("Error executing SELECT query:", err.message);
      return "";
    } else {
      if (row) {
        console.log("Row found:", row);
        return JSON.stringify(row);
      } else {
        console.log("No row found with the given ID.");
        return "";
      }
    }
  });
}

function insert(
  tableName: string,
  columns: string[],
  dataToInsert: string[]
): boolean {
  let columnsStr = "";
  columns.forEach((column, i, arr) => {
    columnsStr += column + (i + 1 != arr.length ? "," : "");
  });

  let dataStr = "";
  dataToInsert.forEach((data, i, arr) => {
    dataStr += "?" + (i + 1 != arr.length ? "," : "");
  });

  let insertQuery = `INSERT INTO ${tableName} (${columnsStr}) VALUES (${dataStr})`;

  return db.run(insertQuery, dataToInsert, function (err) {
    if (err) {
      console.error("Error executing INSERT query:", err.message);
      return false;
    } else {
      console.log(`Row inserted with ID: `);
      return true;
    }
  });
}

function updateById(
  tableName: string,
  columns: string[],
  newDataToInsert: string[],
  id: string
): boolean {
  let columnsStr = "";
  columns.forEach((column, i, arr) => {
    columnsStr += `${column} = ?` + (i + 1 != arr.length ? "," : "");
  });

  const updateQuery = `UPDATE ${tableName} SET ${columnsStr} WHERE id = ?`;

  return db.run(updateQuery, newDataToInsert, function (err) {
    if (err) {
      console.error("Error executing UPDATE query:", err.message);
      return false;
    } else {
      console.log(`Row updated:  row(s) affected`);
      return true;
    }
  });
}

function deleteById(tableName: string, id: string): boolean {
  return db.run(`DELETE FROM ${tableName} WHERE id = ?`, [id], function (err) {
    if (err) {
      console.error("Error executing DELETE query:", err.message);
      return false;
    } else {
      console.log(`Row(s) deleted:  row(s) affected`);
      return true;
    }
  });
}

function generateQueryByFields(fields: Map<string, string>): string {
  let resp = "";
  let i = 0;
  for (const [key, value] of fields) {
    resp += `${key} ${value} NOT NULL` + (i + 1 != fields.size ? "," : "");
    i++;
  }

  return resp;
}

//public

export function createExpenseTable(): void {
  createTable(
    SqliteTableNames.EXPENSE,
    new Map([
      ["done", "TEXT"],
      ["description", "TEXT"],
      ["value", "TEXT"],
      ["lastUpdate", "TEXT"],
    ])
  );
}

export function createIncomeTable(): void {
  createTable(
    SqliteTableNames.INCOME,
    new Map([
      ["description", "TEXT"],
      ["value", "TEXT"],
      ["lastUpdate", "TEXT"],
    ])
  );
}

export function createMonthlyResult(): void {
  createTable(
    SqliteTableNames.MONTHLY_RESULT,
    new Map([
      ["month", "TEXT"],
      ["expenseAmount", "TEXT"],
      ["incomeAmount", "TEXT"],
      ["totalAmount", "TEXT"],
      ["lastUpdate", "TEXT"],
    ])
  );
}

export function selectAllExpenses(): string {
  return selectAll(SqliteTableNames.EXPENSE);
}

export function selectAllIncomes(): string {
  return selectAll(SqliteTableNames.INCOME);
}

export function selectAllMonthlyResult(): string {
  return selectAll(SqliteTableNames.MONTHLY_RESULT);
}

export function selectByIdExpenses(id: string): string {
  return selectById(SqliteTableNames.EXPENSE, id);
}

export function selectByIdIncomes(id: string): string {
  return selectById(SqliteTableNames.INCOME, id);
}

export function selectByIdMonthlyResults(id: string): string {
  return selectById(SqliteTableNames.MONTHLY_RESULT, id);
}

export function insertExpense(dataToInsert: string[]): boolean {
  return insert(
    SqliteTableNames.EXPENSE,
    ["description", "value", "lastUpdate", "done"],
    dataToInsert
  );
}

export function insertIncome(dataToInsert: string[]): boolean {
  return insert(
    SqliteTableNames.INCOME,
    ["description", "value", "lastUpdate"],
    dataToInsert
  );
}

export function insertMonthlyResult(dataToInsert: string[]): boolean {
  return insert(
    SqliteTableNames.MONTHLY_RESULT,
    ["month", "expenseAmount", "incomeAmount", "totalAmount", "lastUpdate"],
    dataToInsert
  );
}

export function updateByIdMonthlyResult(
  id: string,
  dataToInsert: string[]
): boolean {
  return updateById(
    SqliteTableNames.MONTHLY_RESULT,
    ["month", "expenseAmount", "incomeAmount", "totalAmount", "lastUpdate"],
    dataToInsert,
    id
  );
}

export function updateByIdExpense(id: string, dataToInsert: string[]): boolean {
  return updateById(
    SqliteTableNames.EXPENSE,
    ["description", "value", "lastUpdate", "done"],
    dataToInsert,
    id
  );
}

export function updateByIdIncome(id: string, dataToInsert: string[]): boolean {
  return updateById(
    SqliteTableNames.INCOME,
    ["description", "value", "lastUpdate"],
    dataToInsert,
    id
  );
}

export function deleteByIdIncome(id: string): boolean {
  return deleteById(SqliteTableNames.INCOME, id);
}

export function deleteByIdExpense(id: string): boolean {
  return deleteById(SqliteTableNames.EXPENSE, id);
}

export function deleteByIdMonthlyResult(id: string): boolean {
  return deleteById(SqliteTableNames.MONTHLY_RESULT, id);
}
