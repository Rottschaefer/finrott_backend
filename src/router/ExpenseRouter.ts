import express from "express";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { ExpenseController } from "../controller/ExpenseController";
import { ExpenseBusiness } from "../business/ExpenseBusiness";
import { ExpenseDatabase } from "../database/ExpenseDatabase";

export const expenseRouter = express.Router();

const expenseController = new ExpenseController(
  new ExpenseBusiness(
    new ExpenseDatabase(),
    new IdGenerator(),
    new TokenManager()
  )
);

expenseRouter.get("/", expenseController.getExpensesByUserId);

expenseRouter.post("/", expenseController.createExpense);
expenseRouter.put("/:id", expenseController.updateExpense);
expenseRouter.delete("/:id", expenseController.deleteExpense);
