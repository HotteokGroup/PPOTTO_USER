import { FileContentType } from '@prisma/client';

export class CreateFileCommand {
  /** 파일 유형 (프로필 이미지, 피드 이미지) */
  contentType: FileContentType;

  /** 고객 아이디 */
  userId: number;

  constructor(params: CreateFileCommand) {
    Object.assign(this, params);
  }
}

export class CreateFileCommandResult {
  /** 생성 결과 */
  readonly id: string;

  constructor(params: CreateFileCommandResult) {
    Object.assign(this, params);
  }
}
