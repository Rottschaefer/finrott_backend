import { UserDatabase } from "../database/UserDatabase";
import { LogInInputDTO, LogInOutputDTO } from "../dtos/Users/LogInDTO";
import {
  SignUpInputUserDTO,
  SignUpOutputUserDTO,
} from "../dtos/Users/SignUpDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { USER_ROLES, User, UserDB } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}

  public getUsers = async () => {
    const usersDB = await this.userDatabase.getUsers();

    const users = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
      );

      return user.toBusinessModel();
    });

    const output = users;

    return output;
  };

  public signUp = async (
    input: SignUpInputUserDTO
  ): Promise<SignUpOutputUserDTO> => {
    const { name, email, password } = input;

    const hashPassword = await this.hashManager.hash(password);

    const id = this.idGenerator.generate();

    const usersDB = await this.userDatabase.getUsers();

    const user = usersDB.find((userDB) => userDB.email === email);

    if (user) {
      throw new BadRequestError("Já existe um usuário com esse email");
    }

    const newUser = new User(
      id,
      name,
      email,
      hashPassword,
      USER_ROLES.NORMAL,
      new Date().toISOString()
    );

    const newUserDB: UserDB = {
      id: newUser.getId(),
      name: newUser.getName(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      role: newUser.getRole(),
      created_at: newUser.getCreatedAt(),
    };

    const tokenPayload: TokenPayload = {
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole(),
    };

    const token = this.tokenManager.createToken(tokenPayload);

    await this.userDatabase.signUp(newUserDB);

    return { token };
  };

  public logInWithToken = (input: any) => {
    let message: string = "token inválido";
    let payload;
    if (input.token) {
      payload = this.tokenManager.getPayload(input.token);
      if (payload) {
        message = "token válido"; // mensagem que ativa a lógica de logIn por token
      } else {
        message = "token inválido"; // mensagem que ativa a lógica de logIn por email e senha depois do token ter falhado
      }
    }

    const output = {
      message,
      payload,
    };

    return output;
  };

  public logIn = async (input: any): Promise<any> => {
    // console.log("Input recebido:", input);
    // if (input.token) {
    //   const payload = this.tokenManager.getPayload(input.token);
    //   if (payload) {
    //     return "token válido"; // mensagem que ativa a lógica de logIn por token
    //   } else {
    //     return "token inválido"; // mensagem que ativa a lógica de logIn por email e senha depois do token ter falhado
    //   }
    // } else {
    const { email, password } = input;

    const userDB: UserDB = await this.userDatabase.findUserByEmail(email);

    if (!userDB) {
      throw new BadRequestError("Email não cadastrado");
    }

    const isPasswordCorrect = await this.hashManager.compare(
      password,
      userDB.password
    );

    if (!isPasswordCorrect) {
      throw new BadRequestError("Senha incorreta");
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    );

    const tokenPayload: TokenPayload = {
      id: userDB.id,
      name: userDB.name,
      role: userDB.role,
    };

    const token = this.tokenManager.createToken(tokenPayload);

    const outcome = {
      token,
      tokenPayload,
    };

    return outcome;
    // }
  };
}
