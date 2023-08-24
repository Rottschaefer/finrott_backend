import { BaseDatabase } from "../../src/database/BaseDatabase";
import { ExpenseDB } from "../../src/models/Expenses";
import { GetExpensesDataBaseInputDTO } from "../../src/dtos/Expenses/GetExpensesDTO";
import { UpdateExpenseInputDTO } from "../../src/dtos/Expenses/UpdateExpenseDTO";

export let expensesMock: any[] = [
  {
    id: 1,
    creator_id: "id-mock-fulano",
    name: "Comida",
    spent: 20,
    to_spend: 120,
    created_at: "date",
    updated_at: "date",
  },
  {
    id: 2,
    creator_id: "id-mock-ciclano",
    name: "Uber",
    spent: 80,
    to_spend: 300,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export class ExpenseDatabaseMock extends BaseDatabase {
  public static TABLE_EXPENSES = "posts";

  public getExpensesByUserId = async (input: GetExpensesDataBaseInputDTO) => {
    const output = expensesMock.filter(
      (expense) => expense.creator_id === input.id
    );
    return output;
  };

  public createExpense = async (input: ExpenseDB) => {
    expensesMock.push(input);
  };

  public updateExpense = async (
    input: UpdateExpenseInputDTO
  ): Promise<void> => {
    expensesMock.map((expense) => {
      if (expense.id === input.id) {
        expense.name = input.name;
        expense.spent = input.spent;
        expense.to_spend = input.toSpend;
      }

      return expense;
    });
  };

  public deleteExpense = async (id: number) => {
    expensesMock = expensesMock.filter((expense) => expense.id !== id);
  };
}
