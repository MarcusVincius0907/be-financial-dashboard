import {
  deleteByIdMonthlyResult,
  insertMonthlyResult,
  selectAllMonthlyResult,
  selectByIdMonthlyResults,
  updateByIdMonthlyResult,
} from "../db/queries";
import { MonthlyResult } from "../models";
import { getObjectPropertyValues } from "../utils";
import { Request, Response } from "express";

export default class MonthlyResultController {
  getAll(req: Request, res: Response) {
    try {
      const resp = JSON.parse(selectAllMonthlyResult());
      return res.status(200).json({
        status: "ok",
        message: "Monthly Results found",
        payload: resp,
      });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Monthly Results not found.",
      });
    }
  }
  getById(req: Request, res: Response) {
    try {
      const resp = JSON.parse(selectByIdMonthlyResults(req?.params?.id));
      return res
        .status(200)
        .json({ status: "ok", message: "Monthly Result found", payload: resp });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Monthly Results not found.",
      });
    }
  }
  insert(req: Request, res: Response) {
    try {
      req.body.monthlyResults.forEach((data: any) => {
        insertMonthlyResult(getObjectPropertyValues(data));
      });
      return res
        .status(200)
        .json({ status: "ok", message: "Monthly Result created" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not create",
      });
    }
  }
  updateById(req: Request, res: Response) {
    try {
      req.body.monthlyResults.forEach((data: any) => {
        updateByIdMonthlyResult(req?.params?.id, getObjectPropertyValues(data));
      });
      return res
        .status(200)
        .json({ status: "ok", message: "Monthly Result updated" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not update",
      });
    }
  }
  deleteById(req: Request, res: Response) {
    try {
      deleteByIdMonthlyResult(req?.params?.id);
      return res
        .status(200)
        .json({ status: "ok", message: "Monthly Result deleted" });
    } catch (e) {
      return res.status(404).json({
        status: "Error",
        message: "Could not delete",
      });
    }
  }
}
