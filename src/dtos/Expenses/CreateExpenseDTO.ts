import z from "zod";

export interface CreateExpenseInputDTO {
  token: string;
  name: string;
  spent: number;
  toSpend: number;
}

export interface CreateExpenseOutputDTO {
  content: string;
}

export const CreateEsxpenseSchema = z
  .object({
    token: z.string({
      required_error:
        "É necessário um token para acessar a requisição createExpense",
      invalid_type_error: "'Token' precisa ser uma string",
    }),
    name: z.string({
      required_error: "É necessário um 'name' para a requisição createExpense",
      invalid_type_error: "'name' precisa ser uma string",
    }),
    spent: z.number({ invalid_type_error: "'spent' precisa ser um number" }),
    toSpend: z.number({
      required_error: "'toSpend' é necessário para a requisição createExpense",
    }),
  })
  .transform((data) => data as CreateExpenseInputDTO);
