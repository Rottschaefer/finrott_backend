import { ExpenseBusiness } from "../../../src/business/ExpenseBusiness";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import {
  ExpenseDatabaseMock,
  expensesMock,
} from "../../mocks/ExpenseDataBaseMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";

describe("Testando createExpense", () => {
  const expenseBusiness = new ExpenseBusiness(
    new ExpenseDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve criar post corretamente", async () => {
    await expenseBusiness.createExpense({
      token: "token-mock-fulano",
      name: "Nova Expense",
      spent: 30,
      toSpend: 200,
    });

    expect(expensesMock).toHaveLength(3);
  });
});
