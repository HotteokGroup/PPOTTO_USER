export class ModifyUserCommand {
  userId: number;

  nickName?: string;

  password?: string;

  profileImage?: string;

  constructor(params: ModifyUserCommand) {
    Object.assign(this, params);
  }
}

export class ModifyUserCommandResult {
  id: number;
}
