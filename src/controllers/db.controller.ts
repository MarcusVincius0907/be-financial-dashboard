import {
  createExpenseTable,
  createIncomeTable,
  createMonthlyResult,
} from "../db/queries";
import { Request, Response } from "express";

export default class DBController {
  up(req: Request, res: Response) {
    createExpenseTable();
    createIncomeTable();
    createMonthlyResult();

    res.status(200).json({ status: "ok", message: "Creating tables" });
  }
}
