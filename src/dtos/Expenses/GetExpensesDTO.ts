import z from "zod";

export interface GetExpensesInputDTO {
  token: string;
}

export interface GetExpensesDataBaseInputDTO {
  id: string;
}

export interface GetExpensesOutputDTO {
  id: string;
  creatorId: string;
  name: string;
  spent: number;
  toSpend: number;
  createdAt: string;
  updatedAt: string;
}

export const GetExpensesSchema = z
  .object({
    token: z.string().min(1),
  })
  .transform((data) => data as GetExpensesInputDTO);
