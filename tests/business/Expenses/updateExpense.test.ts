import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { ExpenseBusiness } from "../../../src/business/ExpenseBusiness";
import { ExpenseDatabaseMock } from "../../mocks/ExpenseDataBaseMock";

describe("Testando updateExpense", () => {
  const expenseBusiness = new ExpenseBusiness(
    new ExpenseDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve editar expense corretamente", async () => {
    await expenseBusiness.updateExpense({
      id: 1,
      name: "ExpenseName editado",
      spent: 4000,
      toSpend: 20000,
    });

    const updatedExpenses = await expenseBusiness.getExpensesByUserId({
      token: "token-mock-fulano",
    });

    expect(updatedExpenses).toEqual([
      {
        id: 1,
        creatorId: "id-mock-fulano",
        name: "ExpenseName editado",
        spent: 4000,
        toSpend: 20000,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: 2,
        creatorId: "id-mock-ciclano",
        name: "Uber",
        spent: 80,
        toSpend: 300,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });
});
