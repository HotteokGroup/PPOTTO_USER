export class GetUserListQuery {
  /** 검색할 고객 아이디 */
  userId: number[];

  /** 회원 탈퇴 고객 포함 여부 */
  includeDeletedUser: boolean;

  constructor(params: GetUserListQuery) {
    Object.assign(this, params);
  }
}

export class GetUserListQueryResult {
  /** 검색할 고객 아이디 */
  total: number;

  /** 고객 정보 */
  list: {
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

    /** 회원 삭제일 */
    deletedAt: Date;

    /** 프로필 마지막 업데이트일 */
    updatedAt: Date;

    /** 회원 생성일 */
    createdAt: Date;
  }[];

  constructor(params: GetUserListQueryResult) {
    Object.assign(this, params);
  }
}
