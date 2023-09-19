import z from "zod";

export interface DeleteExpensesInputDTO {
  id: string;
}

export const DeleteExpensesSchema = z
  .object({
    id: z.string().min(1),
  })
  .transform((data) => data as DeleteExpensesInputDTO);
