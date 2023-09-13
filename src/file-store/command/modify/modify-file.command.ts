import { FileContentType } from '@prisma/client';

export class ModifyFileCommand {
  /** 파일 아이디 */
  id: string;

  /** 고객 아이디 */
  userId?: number;

  /** 파일 유형 (프로필 이미지, 피드 이미지) */
  contentType?: FileContentType;

  /** 연결된 콘텐츠 아이디 */
  contentId?: string;

  /** 원본 파일 주소 */
  originalFileUrl?: string;

  /** 작은 섬네일 주소 */
  smallThumbnailUrl?: string;

  /** 중간 섬네일 주소 */
  mediumThumbnailUrl?: string;

  /** 큰 섬네일 주소 */
  largeThumbnailUrl?: string;

  /** 콘텐츠 관계 해제일 */
  disconnectedAt?: string;

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
