import express from "express";
import cors from "cors";
import { userRouter } from "./router/UserRouter";
import { expenseRouter } from "./router/ExpenseRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT) || 3003, () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`);
});

app.use("/users", userRouter);

app.use("/expenses", expenseRouter);
