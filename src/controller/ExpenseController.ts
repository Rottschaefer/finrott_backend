import { Request, Response } from "express";
import { GetExpensesInputDTO } from "../dtos/Expenses/GetExpensesDTO";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { ExpenseBusiness } from "../business/ExpenseBusiness";
import { CreateEsxpenseSchema } from "../dtos/Expenses/CreateExpenseDTO";

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

  //   public editPost = async (req: Request, res: Response) => {
  //     try {
  //       const input = EditPostInputSchema.parse({
  //         id: req.params.id,
  //         token: req.headers.authorization,
  //         content: req.body.content,
  //       });

  //       await this.postBusiness.editPost(input);

  //       res.status(200).send({ content: input.content });
  //     } catch (error) {
  //       console.log(error);
  //       if (error instanceof ZodError) {
  //         res.status(400).send(error.issues);
  //       } else if (error instanceof BaseError) {
  //         res.status(error.statusCode).send(error.message);
  //       } else {
  //         res.status(500).send("Erro inesperado");
  //       }
  //     }
  //   };

  //   public deletePost = async (req: Request, res: Response) => {
  //     try {
  //       const input = DeletePostInputSchema.parse({
  //         id: req.params.id,
  //         token: req.headers.authorization,
  //       });

  //       await this.postBusiness.deletePost(input);

  //       res.status(200).send("Post deletado");
  //     } catch (error) {
  //       console.log(error);
  //       if (error instanceof ZodError) {
  //         res.status(400).send(error.issues);
  //       } else if (error instanceof BaseError) {
  //         res.status(error.statusCode).send(error.message);
  //       } else {
  //         res.status(500).send("Erro inesperado");
  //       }
  //     }
  //   };

  //   public likePost = async (req: Request, res: Response) => {
  //     try {
  //       const input = LikePostInputSchema.parse({
  //         id: req.params.id,
  //         token: req.headers.authorization,
  //         like: req.body.like,
  //       });

  //       const isLiked = await this.postBusiness.likePost(input);

  //       res.status(200).send({ isLiked: isLiked });
  //     } catch (error) {
  //       console.log(error);
  //       if (error instanceof ZodError) {
  //         res.status(400).send(error.issues);
  //       } else if (error instanceof BaseError) {
  //         res.status(error.statusCode).send(error.message);
  //       } else {
  //         res.status(500).send("Erro inesperado");
  //       }
  //     }
  //   };

  //   public verifyLike = async (req: Request, res: Response) => {
  //     try {
  //       const input = VerifyLikeInputSchema.parse({
  //         id: req.params.id,
  //         token: req.headers.authorization,
  //       });

  //       const likeSituation = await this.postBusiness.verifyLike(input);

  //       res.status(200).send({ likeSituation });
  //     } catch (error) {
  //       console.log(error);
  //       if (error instanceof ZodError) {
  //         res.status(400).send(error.issues);
  //       } else if (error instanceof BaseError) {
  //         res.status(error.statusCode).send(error.message);
  //       } else {
  //         res.status(500).send("Erro inesperado");
  //       }
  //     }
  //   };
}
