export class ModifyUserCommand {
  /** 회원 아이디 */
  userId: number;

  /** 닉네임 */
  nickName?: string;

  /** 비밀번호 */
  password?: string;

  /** 프로필 이미지 */
  profileImage?: string;

  constructor(params: ModifyUserCommand) {
    Object.assign(this, params);
  }
}

export class ModifyUserCommandResult {
  /** 회원 아이디 */
  userId: number;
}
