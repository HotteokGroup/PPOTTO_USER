export class GetUserInfoQuery {
  readonly userId: number;

  constructor(params: GetUserInfoQuery) {
    Object.assign(this, params);
  }
}

export class GetUserInfoQueryResult {
  /** 회원 아이디 */
  id: number;

  /** 회원 이메일 */
  email: string;

  /** 이름 */
  nickName: string;

  /** 비밀번호 */
  password: string;

  /** 프로필 사진 */
  profileImage?: string;

  /** 회원 삭제일 */
  deletedAt?: Date;

  /** 프로필 마지막 업데이트일 */
  updatedAt: Date;

  /** 회원 생성일 */
  createdAt: Date;

  /** 약관동의정보 */
  UserTermsOfServiceAgreement: {
    /** 약관동의정보 아이디 */
    id: string;
    /** 회원 아이디 */
    userId: number;
    /** 약관 아이디 */
    termsOfServiceId: number;
    /** 약관동의 해제일 */
    deletedAt?: Date;
    /** 마지막 업데이트일 */
    updatedAt: Date;
    /** 약관동의일 */
    createdAt: Date;
  }[];

  constructor(params: GetUserInfoQueryResult) {
    Object.assign(this, params);
  }
}
