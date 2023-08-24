export interface ExpenseDB {
  // id: number;
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
    // private id: number,
    private creatorId: string,
    private name: string,
    private spent: number,
    private toSpend: number,
    private createdAt: string,
    private updatedAt: string
  ) {}

  // public getId = (): number => {
  //   return this.id;
  // };

  // public setId = (value: number) => {
  //   return (this.id = value);
  // };
  public getCreatorId = (): string => {
    return this.creatorId;
  };

  public setCreatorId = (value: string) => {
    return (this.creatorId = value);
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
    return this.toSpend;
  };

  public setToSpend = (value: number) => {
    return (this.toSpend = value);
  };

  public getCreatedAt = (): string => {
    return this.createdAt;
  };

  public setCreatedAt = (value: string) => {
    return (this.createdAt = value);
  };

  public getUpdatedAt = (): string => {
    return this.updatedAt;
  };

  public setUpdatedAt = (value: string) => {
    return (this.updatedAt = value);
  };
}
