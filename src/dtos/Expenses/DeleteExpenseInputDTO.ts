import z from "zod";

export interface DeleteExpensesInputDTO {
  id: number;
}

export const DeleteExpensesSchema = z
  .object({
    id: z.number().min(1),
  })
  .transform((data) => data as DeleteExpensesInputDTO);
