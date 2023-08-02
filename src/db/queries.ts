import { SqliteTableNames } from "../models";
import db from "./sqlite";

export function createTable(
  tableName: string,
  fields: Map<string, string>
): void {
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

export async function selectAll(tableName) {
  return await new Promise((res, rej) => {
    db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
      if (err) {
        console.error("Error executing query:", err.message);
        rej(err);
      } else {
        res(rows);
      }
    });
  });
}

export async function selectById(tableName: string, id: string) {
  return await new Promise((res, rej) => {
    db.get(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, row) => {
      if (err) {
        console.error("Error executing SELECT query:", err.message);
        rej(err);
      } else {
        if (row) {
          console.log("Row found:", row);
          res(row);
        } else {
          const msg = "No row found with the given ID.";
          console.log(msg);
          rej(msg);
        }
      }
    });
  });
}

export async function insert(
  tableName: string,
  columns: string[],
  dataToInsert: string[]
) {
  let columnsStr = "";
  columns.forEach((column, i, arr) => {
    columnsStr += column + (i + 1 != arr.length ? "," : "");
  });

  let dataStr = "";
  dataToInsert.forEach((data, i, arr) => {
    dataStr += "?" + (i + 1 != arr.length ? "," : "");
  });

  let insertQuery = `INSERT INTO ${tableName} (${columnsStr}) VALUES (${dataStr})`;

  return await new Promise((res, rej) => {
    db.run(insertQuery, dataToInsert, function (err) {
      if (err) {
        console.error("Error executing INSERT query:", err.message);
        rej(err);
      } else {
        console.log(`Row inserted with ID: `);
        res(true);
      }
    });
  });
}

export async function updateById(
  tableName: string,
  columns: string[],
  newDataToInsert: string[],
  id: string
) {
  let columnsStr = "";
  columns.forEach((column, i, arr) => {
    columnsStr += `${column} = ?` + (i + 1 != arr.length ? "," : "");
  });

  const updateQuery = `UPDATE ${tableName} SET ${columnsStr} WHERE id = ?`;

  return await new Promise((res, rej) => {
    db.run(updateQuery, [...newDataToInsert, Number(id)], function (s, err) {
      if (err) {
        console.error("Error executing UPDATE query:", err.message);
        rej(err);
      } else {
        console.log(`Row updated:  row(s) affected ${s}`);
        res(true);
      }
    });
  });
}

export async function deleteById(tableName: string, id: string) {
  return await new Promise((res, rej) => {
    db.run(`DELETE FROM ${tableName} WHERE id = ?`, [id], function (err) {
      if (err) {
        console.error("Error executing DELETE query:", err.message);
        rej(err);
      } else {
        console.log(`Row(s) deleted:  row(s) affected`);
        res(true);
      }
    });
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
