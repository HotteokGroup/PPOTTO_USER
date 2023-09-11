import { FileContentType } from '@prisma/client';

export class ModifyFileCommand {
  /** 파일 아이디 */
  id: string;

  /** 파일 유형 (프로필 이미지, 피드 이미지) */
  contentType?: FileContentType;

  /** 연결된 콘텐츠 아이디 */
  contentId?: string;

  /** 고객 아이디 */
  userId?: number;

  /** 파일명 */
  fileName?: string;

  /** 원본 주소 */
  originalUrl?: string;

  /** 원본 최대비율 주소 */
  originalCompressedUrl?: string;

  /** 작은이미지 주소 */
  smallUrl?: string;

  /** 중간이미지 주소 */
  mediumUrl?: string;

  /** 큰이미지 주소 */
  largeUrl?: string;

  /** 삭제일 */
  deletedAt?: string;

  constructor(params: ModifyFileCommand) {
    Object.assign(this, params);
  }
}

export class ModifyFileCommandResult {
  /** 수정된 컨텐츠 아이디 */
  readonly id: string;

  constructor(params: ModifyFileCommandResult) {
    Object.assign(this, params);
  }
}
