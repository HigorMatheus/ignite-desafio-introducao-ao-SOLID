import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userExist = this.usersRepository.findById(user_id);
    console.log(userExist);

    if (!userExist || userExist.admin !== true) {
      throw new Error("O usuário não tem permissão.");
    }

    const users = this.usersRepository.list();

    const usersList = [
      userExist,
      ...users.filter((user) => user.id !== userExist.id),
    ];

    return usersList;
  }
}

export { ListAllUsersUseCase };
