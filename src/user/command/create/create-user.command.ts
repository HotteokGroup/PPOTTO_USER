export class CreateUserCommand {
  /** 이메일 */
  readonly email: string;

  /** 이름 */
  readonly nickName: string;

  /** 비밀번호 (평문) */
  readonly password: string;

  constructor(params: CreateUserCommand) {
    Object.assign(this, params);
  }
}

export class CreateUserCommandResult {
  /** 생성 결과 */
  readonly id: number;
}
