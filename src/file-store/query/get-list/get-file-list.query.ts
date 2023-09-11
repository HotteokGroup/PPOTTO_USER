import { FileContentType } from '@prisma/client';

export class GetFileListQuery {
  /** 파일 아이디 */
  id?: string[];

  /** 파일 유형 (프로필 이미지, 피드 이미지) */
  contentType?: FileContentType[];

  /** 콘텐츠 아이디 */
  contentId?: string[];

  /** 고객 아이디 */
  userId?: number;

  constructor(params: GetFileListQuery) {
    Object.assign(this, params);
  }
}

export class GetFileListQueryResult {
  list: {
    /** 파일 관리아이디 */
    id: string;

    /** 콘텐츠 타입 */
    contentType: FileContentType;

    /** 회원 아이디 */
    userId: number;

    /** 콘텐츠 아이디 */
    contentId?: string;

    /** 파일명 */
    fileName?: string;

    /** 원본 주소 */
    originUrl?: string;

    /** 원본 최대비율 주소 */
    originalCompressedUrl?: string;

    /** 작은이미지 주소 */
    smallUrl?: string;

    /** 중간이미지 주소 */
    mediumUrl?: string;

    /** 큰이미지 주소 */
    largeUrl?: string;

    /** 삭제일 */
    deletedAt?: Date;

    /** 생성일 */
    createdAt?: Date;
  }[];

  constructor(params: GetFileListQueryResult) {
    Object.assign(this, params);
  }
}
