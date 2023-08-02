import express from "express";
import ExpenseController from "../controllers/expense.controller";
import IncomeController from "../controllers/income.controller";
import MonthlyResultController from "../controllers/monthly-result.controller";
import DBController from "../controllers/db.controller";

const routes = express.Router();

const expenseController = new ExpenseController();
routes.get("/expense", expenseController.getAll);
routes.get("/expense/:id", expenseController.getById);
routes.post("/expense", expenseController.insert);
routes.put("/expense/:id", expenseController.updateById);
routes.delete("/expense/:id", expenseController.deleteById);

const incomeController = new IncomeController();
routes.get("/income", incomeController.getAll);
routes.get("/income/:id", incomeController.getById);
routes.post("/income", incomeController.insert);
routes.put("/income/:id", incomeController.updateById);
routes.delete("/income/:id", incomeController.deleteById);

const monthlyResultController = new MonthlyResultController();
routes.get("/monthly", monthlyResultController.getAll);
routes.get("/monthly/:id", monthlyResultController.getById);
routes.post("/monthly", monthlyResultController.insert);
routes.put("/monthly/:id", monthlyResultController.updateById);
routes.delete("/monthly/:id", monthlyResultController.deleteById);

const dbController = new DBController();
routes.get("/up", dbController.up);

export default routes;
