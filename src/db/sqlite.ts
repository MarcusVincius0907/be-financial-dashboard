import sqlite3 from "sqlite3";
const DBSOURCE = "db.sqlite";

const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Base de dados conectada com sucesso.");
  }
});
export default database;
