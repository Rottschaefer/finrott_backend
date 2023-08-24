import { ExpenseBusiness } from "../../../src/business/ExpenseBusiness";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import {
  ExpenseDatabaseMock,
  expensesMock,
} from "../../mocks/ExpenseDataBaseMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";

describe("Testando deleteExpense", () => {
  const expenseBusiness = new ExpenseBusiness(
    new ExpenseDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve deletar expense corretamente", async () => {
    await expenseBusiness.deleteExpense({
      id: 2,
    });

    expect(expensesMock).toHaveLength(1);
  });
});
