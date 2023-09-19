import { ExpenseDatabase } from "../database/ExpenseDatabase";
import { CreateExpenseInputDTO } from "../dtos/Expenses/CreateExpenseDTO";
import { DeleteExpensesInputDTO } from "../dtos/Expenses/DeleteExpenseInputDTO";
import {
  GetExpensesInputDTO,
  GetExpensesOutputDTO,
} from "../dtos/Expenses/GetExpensesDTO";
import { UpdateExpenseInputDTO } from "../dtos/Expenses/UpdateExpenseDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { Expense, ExpenseDB } from "../models/Expenses";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class ExpenseBusiness {
  constructor(
    private expenseDatabase: ExpenseDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getExpensesByUserId = async (
    input: GetExpensesInputDTO
  ): Promise<GetExpensesOutputDTO[]> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const expensesDB = await this.expenseDatabase.getExpensesByUserId({
      id: payload.id,
    });

    console.log(expensesDB);

    const expenses = expensesDB.map((expenseDB) => {
      return new Expense(
        expenseDB.id,
        expenseDB.creator_id,
        expenseDB.name,
        expenseDB.spent,
        expenseDB.to_spend,
        expenseDB.created_at,
        expenseDB.updated_at
      );
    });

    const output: GetExpensesOutputDTO[] = expenses.map((expense) => {
      return {
        id: expense.getId(),
        creatorId: expense.getCreatorId(),
        name: expense.getName(),
        spent: expense.getSpent(),
        toSpend: expense.getToSpend(),
        createdAt: expense.getCreatedAt(),
        updatedAt: expense.getUpdatedAt(),
      };
    });

    return output;
  };

  public createExpense = async (input: CreateExpenseInputDTO) => {
    const { token, name, spent, toSpend } = input;

    const payload = this.tokenManager.getPayload(token);

    console.log(payload);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const id = this.idGenerator.generate();

    console.log(id);

    const newExpense = new Expense(
      id,
      payload.id,
      name,
      spent,
      toSpend,
      new Date().toISOString(),
      new Date().toISOString()
    );

    const newExpenseDB: ExpenseDB = {
      id: newExpense.getId(),
      creator_id: newExpense.getCreatorId(),
      name: newExpense.getName(),
      spent: newExpense.getSpent(),
      to_spend: newExpense.getToSpend(),
      created_at: newExpense.getCreatedAt(),
      updated_at: newExpense.getUpdatedAt(),
    };

    this.expenseDatabase.createExpense(newExpenseDB);
  };

  public updateExpense = async (input: UpdateExpenseInputDTO) => {
    const { id, name, spent, toSpend } = input;

    const updatedPosts = await this.expenseDatabase.updateExpense(input);

    return updatedPosts; // Para os testes
  };

  public deleteExpense = async (input: DeleteExpensesInputDTO) => {
    const { id } = input;

    await this.expenseDatabase.deleteExpense(id);
  };

  //   public likePost = async (input: LikePostInputDTO) => {
  //     const { id, token, like } = input;

  //     const payload = this.tokenManager.getPayload(token);

  //     if (!payload) {
  //       throw new BadRequestError("Token inválido");
  //     }

  //     const [posts] = await this.postDatabase.getPosts();

  //     const postDB = posts.find((post) => {
  //       return post.id === id;
  //     });

  //     if (postDB) {
  //       const isYourPost = posts.find((post) => {
  //         return post.id === id && post.creator_id === payload.id;
  //       });
  //       if (isYourPost) {
  //         throw new BadRequestError(
  //           "Não é possível dar like ou dislike no próprio post"
  //         );
  //       }
  //     }

  //     if (!postDB) {
  //       throw new BadRequestError("Não existe nenhum post com esse id");
  //     }

  //     let isLiked = await this.postDatabase.verifyLike(id, payload.id);

  //     let likesNumber = postDB.likes;
  //     let dislikesNumber = postDB.dislikes;

  //     if (like) {
  //       if (isLiked === 1) {
  //         likesNumber = postDB.likes - 1;
  //         // throw new BadRequestError("O usuário já deu like esse post")//Mudar aqui pra ter como tirar o like
  //         isLiked = 3; // se o usuário retira o like, o isLiked volta a ser 2, retratando um post que teve a interação retirada
  //       }

  //       if (isLiked === 0) {
  //         likesNumber = postDB.likes + 1;
  //         dislikesNumber = postDB.dislikes - 1;
  //         isLiked = 1;
  //       } else if (isLiked === 2) {
  //         likesNumber = postDB.likes + 1;
  //         isLiked = 1;
  //         // dislikesNumber = postDB.dislikes
  //       }

  //       // const alreadyLiked = 1

  //       await this.postDatabase.likePost(
  //         likesNumber,
  //         dislikesNumber,
  //         id,
  //         payload.id,
  //         isLiked
  //       );

  //       return isLiked;
  //     } else if (!like) {
  //       if (isLiked === 0) {
  //         dislikesNumber = postDB.dislikes - 1;
  //         isLiked = 3; // se o usuário retira o like, o isLiked volta a ser 2, retratando um post que teve a interação retirada
  //         // throw new BadRequestError("O usuário já deu dislike esse post")
  //       }

  //       if (isLiked === 1) {
  //         likesNumber = postDB.likes - 1;
  //         dislikesNumber = postDB.dislikes + 1;
  //         isLiked = 0;
  //       } else if (isLiked === 2) {
  //         likesNumber = 0;
  //         dislikesNumber = postDB.dislikes + 1;
  //         isLiked = 0;
  //       }

  //       await this.postDatabase.dislikePost(
  //         likesNumber,
  //         dislikesNumber,
  //         id,
  //         payload.id,
  //         isLiked
  //       );

  //       return isLiked;
  //     }
  //   };

  //   public verifyLike = async (input: VerifyLikeInputDTO) => {
  //     const { id, token } = input;

  //     const payload = this.tokenManager.getPayload(token);

  //     if (!payload) {
  //       throw new BadRequestError("Token inválido");
  //     }

  //     const likeSituation = await this.postDatabase.verifyLike(id, payload.id);

  //     return likeSituation;
  //   };
}
