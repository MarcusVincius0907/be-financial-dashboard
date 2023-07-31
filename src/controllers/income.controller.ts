import {
  deleteByIdIncome,
  insertIncome,
  selectAllIncomes,
  selectByIdIncomes,
  updateByIdIncome,
} from "../db/queries";
import { IncomeData, FinancialDataItem } from "../models";
import { getObjectPropertyValues } from "../utils";
import { Request, Response } from "express";

export default class IncomeController {
  getAll(req: Request, res: Response) {
    try {
      const resp = JSON.parse(selectAllIncomes());
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
  getById(req: Request, res: Response) {
    try {
      const resp = JSON.parse(selectByIdIncomes(req?.params?.id));
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
  insert(req: Request, res: Response) {
    try {
      req.body.incomes.forEach((data: any) => {
        insertIncome(getObjectPropertyValues(data));
      });
      return res.status(200).json({ status: "ok", message: "Income created" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not create income",
      });
    }
  }
  updateById(req: Request, res: Response) {
    try {
      req?.body?.incomes.forEach((data: any) => {
        updateByIdIncome(req.params?.id, getObjectPropertyValues(data));
      });
      return res.status(200).json({ status: "ok", message: "Income updated" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not create income",
      });
    }
  }
  deleteById(req: Request, res: Response) {
    try {
      deleteByIdIncome(req?.params?.id);
      return res.status(200).json({ status: "ok", message: "Income deleted" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not delete",
      });
    }
  }
}
