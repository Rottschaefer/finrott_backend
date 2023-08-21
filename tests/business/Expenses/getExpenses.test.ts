import { ExpenseBusiness } from "../../../src/business/ExpenseBusiness";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { ExpenseDatabaseMock } from "../../mocks/ExpenseDataBaseMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { GetExpensesOutputDTO } from "../../../src/dtos/Expenses/GetExpensesDTO";
import { string } from "zod";

describe("Testando getExpenses", () => {
  const expenseBusiness = new ExpenseBusiness(
    new ExpenseDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve retornar expenses por userId corretamente", async () => {
    const expenseMockModel = await expenseBusiness.getExpensesByUserId({
      token: "token-mock-fulano",
    });

    expect(expenseMockModel).toEqual([
      {
        creatorId: "id-mock-fulano",
        name: "Comida",
        spent: 20,
        toSpend: 120,
        createdAt: "date",
        updatedAt: "date",
      },
    ]);
  });
});
