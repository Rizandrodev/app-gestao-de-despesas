import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
  return open({
    filename: "./expenses.db",
    driver: sqlite3.Database,
  });
};

export default initDB;
