import express from "express";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDatabase";
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
// expenseRouter.get("/:id/verify-like", expenseController.verifyLike);

// expenseRouter.post("/", expenseController.createPost);
// expenseRouter.put("/:id", expenseController.editPost);
// expenseRouter.delete("/:id", expenseController.deletePost);
// expenseRouter.put("/:id/like", expenseController.likePost);
