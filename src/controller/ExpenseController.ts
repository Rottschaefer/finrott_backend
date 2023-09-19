import { Request, Response } from "express";
import { GetExpensesInputDTO } from "../dtos/Expenses/GetExpensesDTO";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { ExpenseBusiness } from "../business/ExpenseBusiness";
import { CreateEsxpenseSchema } from "../dtos/Expenses/CreateExpenseDTO";
import { UpdateExpenseInputSchema } from "../dtos/Expenses/UpdateExpenseDTO";
import { DeleteExpensesSchema } from "../dtos/Expenses/DeleteExpenseInputDTO";

export class ExpenseController {
  constructor(private expenseBusiness: ExpenseBusiness) {}

  public getExpensesByUserId = async (req: Request, res: Response) => {
    try {
      const tokenInput = req.headers.authorization as string;

      const token: GetExpensesInputDTO = {
        token: tokenInput,
      };

      const output = await this.expenseBusiness.getExpensesByUserId(token);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createExpense = async (req: Request, res: Response) => {
    try {
      const input = CreateEsxpenseSchema.parse({
        token: req.headers.authorization,
        name: req.body.name,
        spent: req.body.spent,
        toSpend: req.body.toSpend,
      });

      await this.expenseBusiness.createExpense(input);

      res.status(200).send({ content: input });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public updateExpense = async (req: Request, res: Response) => {
    try {
      const input = UpdateExpenseInputSchema.parse({
        id: req.params.id,
        name: req.body.name,
        spent: req.body.spent,
        toSpend: req.body.toSpend,
      });

      await this.expenseBusiness.updateExpense(input);

      res.status(200).send("Despesa atualizada com sucesso");
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deleteExpense = async (req: Request, res: Response) => {
    try {
      const input = DeleteExpensesSchema.parse({
        id: req.params.id,
      });

      await this.expenseBusiness.deleteExpense(input);

      res.status(200).send("Despesa deletado");
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
