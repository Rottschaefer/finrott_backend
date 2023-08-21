import { PostDB } from "../../src/models/Posts";
import { BaseDatabase } from "../../src/database/BaseDatabase";
import { usersMock } from "../mocks/UserDataBaseMock";
import { ExpenseDB } from "../../src/models/Expenses";
import { GetExpensesDataBaseInputDTO } from "../../src/dtos/Expenses/GetExpensesDTO";

export let expensesMock: ExpenseDB[] = [
  {
    creator_id: "id-mock-fulano",
    name: "Comida",
    spent: 20,
    to_spend: 120,
    created_at: "date",
    updated_at: "date",
  },
  {
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

  //   public createPost = async (NewPostDB: PostDB) => {
  //     postsMock.push(NewPostDB);
  //   };

  //   public editPost = async (id: string, content: string): Promise<void> => {
  //     postsMock.map((post) => {
  //       if (post.id === id) {
  //         post.content = content;
  //       }

  //       return post;
  //     });
  //   };

  //   public deletePost = async (id: string) => {
  //     postsMock = postsMock.filter((post) => post.id !== id);
  //   };

  //   public likePost = async (
  //     likesNumber: number,
  //     dislikesNumber: number,
  //     post_id: string,
  //     user_id: string,
  //     isLiked: number
  //   ) => {
  //     postsMock = postsMock.map((post) => {
  //       if (post.id === post_id) {
  //         post.likes = likesNumber;
  //         post.dislikes = dislikesNumber;
  //       }

  //       return post;
  //     });
  //   };

  //   public dislikePost = async (
  //     likesNumber: number,
  //     dislikesNumber: number,
  //     post_id: string,
  //     user_id: string,
  //     isLiked: number
  //   ) => {
  //     postsMock.map((post) => {
  //       if (post.id === post_id) {
  //         post.likes = likesNumber;
  //         post.dislikes = dislikesNumber;
  //       }
  //     });
  //   };

  //   public verifyLike = async (post_id: string, user_id: string) => {
  //     let isLiked = 0;

  //     return isLiked;
  //   };
}
