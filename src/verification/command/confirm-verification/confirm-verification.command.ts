export class ConfirmVerificationCommand {
  /** 인증 아이디 */
  id: string;

  /** 인증코드 */
  verificationCode: string;

  constructor(params: ConfirmVerificationCommand) {
    Object.assign(this, params);
  }
}

export class ConfirmVerificationCommandResult {
  /** 인증 요청 결과 아이디 */
  id: string;

  /** 인증 결과 */
  result: boolean;

  /** 남은 인증가능 횟수 */
  remaining: number;

  constructor(params: ConfirmVerificationCommandResult) {
    Object.assign(this, params);
  }
}
