import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateUserCommand, CreateUserCommandResult } from './command/create/create-user.command';
import { ModifyUserCommand, ModifyUserCommandResult } from './command/modify/modify-user.command';

@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus) {}

  /**
   * 고객 생성
   */
  async create(params: CreateUserCommand) {
    return this.commandBus.execute<CreateUserCommand, CreateUserCommandResult>(params);
  }

  /**
   * 고객정보 변경
   */
  async modify(params: ModifyUserCommand) {
    return this.commandBus.execute<ModifyUserCommand, ModifyUserCommandResult>(new ModifyUserCommand(params));
  }
}
