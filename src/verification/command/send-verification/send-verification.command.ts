import { UserVerificationType } from '@prisma/client';

export class SendVerificationCommand {
  /** 인증요청 유형 */
  readonly verificationType: UserVerificationType;

  /** 이메일 주소 (인증유형이 이메일인 경우 필수) */
  readonly emailAddress?: string;

  /** 유저 아이디 (기록용) */
  readonly userId?: number;

  constructor(data: SendVerificationCommand) {
    Object.assign(this, data);
  }
}

export class SendVerificationCommandResult {
  /** 인증요청 결과 아이디 */
  readonly id: string;

  constructor(data: SendVerificationCommandResult) {
    Object.assign(this, data);
  }
}
