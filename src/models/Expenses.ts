export interface ExpenseDB {
  creator_id: string;
  name: string;
  spent: number;
  to_spend: number;
  created_at: string;
  updated_at: string;
}

// export interface ExpenseModel {
//   creatorId: string;
//   name: string;
//   spent: number;
//   toSpend: number;
//   createdAt: string;
//   updatedAt: string;
// }

export class Expense {
  constructor(
    private creator_id: string,
    private name: string,
    private spent: number,
    private to_spend: number,
    private created_at: string,
    private updated_at: string
  ) {}

  public getCreatorId = (): string => {
    return this.creator_id;
  };

  public setCreatorId = (value: string) => {
    return (this.creator_id = value);
  };

  public getName = (): string => {
    return this.name;
  };

  public setName = (value: string) => {
    return (this.name = value);
  };

  public getSpent = (): number => {
    return this.spent;
  };

  public setSpent = (value: number) => {
    return (this.spent = value);
  };

  public getToSpend = (): number => {
    return this.to_spend;
  };

  public setToSpend = (value: number) => {
    return (this.to_spend = value);
  };

  public getCreatedAt = (): string => {
    return this.created_at;
  };

  public setCreatedAt = (value: string) => {
    return (this.created_at = value);
  };

  public getUpdatedAt = (): string => {
    return this.updated_at;
  };

  public setUpdatedAt = (value: string) => {
    return (this.updated_at = value);
  };
}
