export class LoginByEmailCommand {
  email: string;

  password: string;

  constructor(params: LoginByEmailCommand) {
    Object.assign(this, params);
  }
}

export class LoginByEmailCommandResult {
  /** 회원 아이디 */
  id: number;

  /** 회원 이메일 */
  email: string;

  /** 이름 */
  nickName: string;

  /** 비밀번호 */
  password: string;

  /** 프로필 사진 */
  profileImage: string;

  /** 프로필 마지막 업데이트일 */
  updatedAt: Date;

  /** 회원 생성일 */
  createdAt: Date;

  constructor(params: LoginByEmailCommandResult) {
    Object.assign(this, params);
  }
}
