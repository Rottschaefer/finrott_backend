import z from "zod";
import { TokenPayload } from "../../services/TokenManager";

export interface LogInInputDTO {
  email: string;
  password: string;
  token?: string | null;
}

export interface LogInOutputDTO {
  token: string;
  payload: TokenPayload;
}

export const LogInSchema = z.object({
  email: z
    .string({
      required_error: "É preciso email para fazer login",
      invalid_type_error: "Email precisa ser string",
    })
    .email("'Email' inválido")
    .optional(),
  password: z
    .string({
      required_error: "É preciso uma senha para fazer login",
      invalid_type_error: "Senha precisa ser string",
    })
    .min(1, "É preciso uma senha para fazer login")
    .optional(),
  token: z
    .string({ invalid_type_error: "'token' precisa ser string" })
    .optional()
    .nullable(),
});
