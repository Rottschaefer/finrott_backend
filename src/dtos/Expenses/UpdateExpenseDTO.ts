import z from "zod";

export interface UpdateExpenseInputDTO {
  id: number;
  name: string;
  spent: number;
  toSpend: number;
}

// export interface EditPostOutputDTO {
//   content: string;
// }

export const EditPostInputSchema = z
  .object({
    id: z
      .string({
        required_error: "id da expense é obrigatório para editá-lo",
        invalid_type_error: "id da expense precisa ser number",
      })
      .min(1),
    name: z.string({
      required_error: "É necessário um 'name' para a requisição createExpense",
      invalid_type_error: "'name' precisa ser uma string",
    }),
    spent: z.number({ invalid_type_error: "'spent' precisa ser um number" }),
    toSpend: z.number({
      required_error: "'toSpend' é necessário para a requisição createExpense",
    }),
  })
  .transform((data) => data as UpdateExpenseInputDTO);
