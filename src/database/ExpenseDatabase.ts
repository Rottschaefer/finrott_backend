import { GetExpensesDataBaseInputDTO } from "../dtos/Expenses/GetExpensesDTO";
import { UpdateExpenseInputDTO } from "../dtos/Expenses/UpdateExpenseDTO";
import { Expense, ExpenseDB } from "../models/Expenses";
import { BaseDatabase } from "./BaseDatabase";

export class ExpenseDatabase extends BaseDatabase {
  public static TABLE_EXPENSES = "expenses";

  public getExpensesByUserId = async (input: GetExpensesDataBaseInputDTO) => {
    const output: ExpenseDB[] = await BaseDatabase.connection(
      ExpenseDatabase.TABLE_EXPENSES
    ).where({ creator_id: input.id });

    return output;
  };

  public createExpense = async (input: ExpenseDB) => {
    await BaseDatabase.connection(ExpenseDatabase.TABLE_EXPENSES).insert(input);
  };

  public updateExpense = async (input: UpdateExpenseInputDTO) => {
    await BaseDatabase.connection(ExpenseDatabase.TABLE_EXPENSES)
      .update({
        id: input.id,
        name: input.name,
        spent: input.spent,
        to_spend: input.toSpend,
        updated_at: new Date().toISOString(),
      })
      .where({ id: input.id });
  };

  public deleteExpense = async (id: string) => {
    await BaseDatabase.connection(ExpenseDatabase.TABLE_EXPENSES)
      .delete()
      .where({ id });
  };

  //   public likePost = async (
  //     likesNumber: number,
  //     dislikesNumber: number,
  //     post_id: string,
  //     user_id: string,
  //     isLiked: number
  //   ) => {
  //     await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
  //       .update({ likes: likesNumber, dislikes: dislikesNumber })
  //       .where({ id: post_id });

  //     if (isLiked === 3) {
  //       await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
  //         .delete()
  //         .where({ post_id, user_id });
  //     }

  //     await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
  //       .update({ like: 1 })
  //       .where({ post_id, user_id });
  //   };

  //   public dislikePost = async (
  //     likesNumber: number,
  //     dislikesNumber: number,
  //     post_id: string,
  //     user_id: string,
  //     isLiked: number
  //   ) => {
  //     await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
  //       .update({ likes: likesNumber, dislikes: dislikesNumber })
  //       .where({ id: post_id });

  //     if (isLiked === 3) {
  //       await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
  //         .delete()
  //         .where({ post_id, user_id });
  //     }

  //     await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
  //       .update({ like: 0 })
  //       .where({ post_id, user_id });
  //   };

  //   public verifyLike = async (post_id: string, user_id: string) => {
  //     let [likes_dislikes] = await BaseDatabase.connection(
  //       PostDatabase.TABLE_LIKES_DISLIKES
  //     ).where({ post_id, user_id });

  //     let isLiked;

  //     if (!likes_dislikes) {
  //       await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
  //         .insert({ user_id, post_id, like: 2 })
  //         .where({ post_id, user_id });

  //       [likes_dislikes] = await BaseDatabase.connection(
  //         PostDatabase.TABLE_LIKES_DISLIKES
  //       ).where({ post_id, user_id });

  //       isLiked = likes_dislikes.like;
  //     } else if (likes_dislikes) {
  //       isLiked = likes_dislikes.like;
  //     }

  //     return isLiked;
  //   };
}
