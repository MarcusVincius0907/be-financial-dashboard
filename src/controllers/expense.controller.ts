import {
  deleteById,
  insert,
  selectAll,
  selectById,
  updateById,
} from "../db/queries";
import { FinancialDataItem, SqliteTableNames } from "../models";
import { getObjectPropertyKeys, getObjectPropertyValues } from "../utils";
import { Request, Response } from "express";

//TODO test all methods in insomnia

export default class ExpenseController {
  async getAll(req: Request, res: Response) {
    try {
      const resp = await selectAll(SqliteTableNames.EXPENSE);
      return res
        .status(200)
        .json({ status: "ok", message: "Expenses found", payload: resp });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Expenses not found.",
      });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const resp = await selectById(SqliteTableNames.EXPENSE, req.params.id);
      return res
        .status(200)
        .json({ status: "ok", message: "Expense found", payload: resp });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Expenses not found.",
      });
    }
  }
  async insert(req: Request, res: Response) {
    try {
      await insert(
        SqliteTableNames.EXPENSE,
        getObjectPropertyKeys<FinancialDataItem>(req?.body),
        getObjectPropertyValues<FinancialDataItem>(req?.body)
      );
      return res.status(200).json({ status: "ok", message: "Expense created" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not insert expense",
      });
    }
  }
  async updateById(req: Request, res: Response) {
    try {
      await updateById(
        SqliteTableNames.EXPENSE,
        getObjectPropertyKeys<FinancialDataItem>(req?.body),
        getObjectPropertyValues<FinancialDataItem>(req?.body),
        req?.params?.id
      );

      return res.status(200).json({ status: "ok", message: "Expense updated" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not update",
      });
    }
  }
  async deleteById(req: Request, res: Response) {
    try {
      await deleteById(SqliteTableNames.EXPENSE, req?.params?.id);
      return res.status(200).json({ status: "ok", message: "Expense deleted" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not delete",
      });
    }
  }
}
