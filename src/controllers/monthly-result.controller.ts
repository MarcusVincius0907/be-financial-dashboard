import {
  deleteById,
  insert,
  selectAll,
  selectById,
  updateById,
} from "../db/queries";
import { SqliteTableNames } from "../models";
import { getObjectPropertyKeys, getObjectPropertyValues } from "../utils";
import { Request, Response } from "express";

export default class MonthlyResultController {
  async getAll(req: Request, res: Response) {
    try {
      const resp = await selectAll(SqliteTableNames.MONTHLY_RESULT);
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
  async getById(req: Request, res: Response) {
    try {
      const resp = await selectById(
        SqliteTableNames.MONTHLY_RESULT,
        req?.params?.id
      );
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
  async insert(req: Request, res: Response) {
    try {
      await insert(
        SqliteTableNames.MONTHLY_RESULT,
        getObjectPropertyKeys(req.body),
        getObjectPropertyValues(req.body)
      );
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
  async updateById(req: Request, res: Response) {
    try {
      await updateById(
        SqliteTableNames.MONTHLY_RESULT,
        getObjectPropertyKeys(req.body),
        getObjectPropertyValues(req.body),
        req?.params?.id
      );
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
  async deleteById(req: Request, res: Response) {
    try {
      await deleteById(SqliteTableNames.MONTHLY_RESULT, req?.params?.id);
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
