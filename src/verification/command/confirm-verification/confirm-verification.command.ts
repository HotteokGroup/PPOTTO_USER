import { UserVerificationType } from '@prisma/client';

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

  /** 인증 타입 */
  verificationType: UserVerificationType;

  /** 유저 아이디 (단순 기록용) */
  userId: number;

  /** 이메일 주소 */
  emailAddress: string;

  constructor(params: ConfirmVerificationCommandResult) {
    Object.assign(this, params);
  }
}
