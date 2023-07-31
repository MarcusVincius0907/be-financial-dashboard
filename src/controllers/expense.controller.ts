import {
  deleteByIdExpense,
  insertExpense,
  selectAllExpenses,
  selectByIdExpenses,
  updateByIdExpense,
} from "../db/queries";
import { ExpenseData, FinancialDataItem } from "../models";
import { getObjectPropertyValues } from "../utils";
import { Request, Response } from "express";

//TODO test all methods in insomnia

export default class ExpenseController {
  getAll(req: Request, res: Response) {
    try {
      const resp = JSON.parse(selectAllExpenses());
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
  getById(req: Request, res: Response) {
    try {
      const resp = JSON.parse(selectByIdExpenses(req.params.id));
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
  insert(req: Request, res: Response) {
    try {
      req?.body?.expenses.forEach((data: any) => {
        insertExpense(getObjectPropertyValues<FinancialDataItem>(data));
      });
      return res.status(200).json({ status: "ok", message: "Expense created" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not insert expense",
      });
    }
  }
  updateById(req: Request, res: Response) {
    try {
      req?.body?.expenses.forEach((data: any) => {
        updateByIdExpense(
          req?.params?.id,
          getObjectPropertyValues<FinancialDataItem>(data)
        );
      });
      return res.status(200).json({ status: "ok", message: "Expense updated" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not update",
      });
    }
  }
  deleteById(req: Request, res: Response) {
    try {
      const resp = deleteByIdExpense(req?.params?.id);
      return res.status(200).json({ status: "ok", message: "Expense deleted" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not delete",
      });
    }
  }
}
