import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserCommand, CreateUserCommandResult } from './command/create/create-user.command';
import { LoginByEmailCommand, LoginByEmailCommandResult } from './command/login-by-email/login-by-email.command';
import { ModifyUserCommand, ModifyUserCommandResult } from './command/modify/modify-user.command';
import { GetUserInfoQuery, GetUserInfoQueryResult } from './query/get-user-info/get-user-info.query';
import { GetUserListQuery, GetUserListQueryResult } from './query/get-user-list/get-user-list.query';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * 고객 리스트 조회
   */
  async getUserList(params: GetUserListQuery) {
    return this.queryBus.execute<GetUserListQuery, GetUserListQueryResult>(new GetUserListQuery(params));
  }
  /**
   * 고객 생성
   */
  async create(params: CreateUserCommand) {
    return this.commandBus.execute<CreateUserCommand, CreateUserCommandResult>(new CreateUserCommand(params));
  }

  /**
   * 고객정보 변경
   */
  async modify(params: ModifyUserCommand) {
    return this.commandBus.execute<ModifyUserCommand, ModifyUserCommandResult>(new ModifyUserCommand(params));
  }

  /**
   * 고객정보 조회
   */
  async getUserInfo(userId: number) {
    return this.queryBus.execute<GetUserInfoQuery, GetUserInfoQueryResult>(new GetUserInfoQuery({ userId }));
  }

  // 이메일, 비밀번호로 일치하는 고객정보 조회
  async getUserInfoByEmailAndPassword(params: LoginByEmailCommand) {
    return this.commandBus.execute<LoginByEmailCommand, LoginByEmailCommandResult>(new LoginByEmailCommand(params));
  }
}
