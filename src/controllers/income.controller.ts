import {
  deleteById,
  insert,
  selectAll,
  selectById,
  updateById,
} from "../db/queries";
import { IncomeData, FinancialDataItem, SqliteTableNames } from "../models";
import { getObjectPropertyKeys, getObjectPropertyValues } from "../utils";
import { Request, Response } from "express";

export default class IncomeController {
  async getAll(req: Request, res: Response) {
    try {
      const resp = await selectAll(SqliteTableNames.INCOME);
      return res
        .status(200)
        .json({ status: "ok", message: "Incomes found", payload: resp });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Incomes not found.",
      });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const resp = await selectById(SqliteTableNames.INCOME, req?.params?.id);
      return res
        .status(200)
        .json({ status: "ok", message: "Income found", payload: resp });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Income not found.",
      });
    }
  }
  async insert(req: Request, res: Response) {
    try {
      await insert(
        SqliteTableNames.INCOME,
        getObjectPropertyKeys(req.body),
        getObjectPropertyValues(req.body)
      );
      return res.status(200).json({ status: "ok", message: "Income created" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not create income",
      });
    }
  }
  async updateById(req: Request, res: Response) {
    try {
      await updateById(
        SqliteTableNames.INCOME,
        getObjectPropertyKeys(req.body),
        getObjectPropertyValues(req.body),
        req.params?.id
      );
      return res.status(200).json({ status: "ok", message: "Income updated" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not create income",
      });
    }
  }
  async deleteById(req: Request, res: Response) {
    try {
      await deleteById(SqliteTableNames.INCOME, req?.params?.id);
      return res.status(200).json({ status: "ok", message: "Income deleted" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not delete",
      });
    }
  }
}
