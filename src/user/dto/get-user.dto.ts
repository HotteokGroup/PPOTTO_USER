import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class GetUserTermsOfServiceAgreementItem {
  @Expose()
  @ApiProperty({ description: '약관동의 아이디', example: 'lm54z0sv00003c7ow3een847' })
  id: string;

  @Expose()
  @ApiProperty({ description: '약관 아이디', example: 1 })
  termsOfServiceId: number;

  @Expose()
  @ApiProperty({ description: '약관동의 해제일', example: null })
  deletedAt: Date;

  @Expose()
  @ApiProperty({ description: '약관동의일', example: '2021-07-01T00:00:00.000Z' })
  createdAt: Date;
}
@Exclude()
export class GetUserResponse {
  @Expose()
  @ApiProperty({ description: '유저 아이디', example: 1 })
  id: number;

  @Expose()
  @ApiProperty({ description: '유저 이메일', example: 'test@mail.com' })
  email: string;

  @Expose()
  @ApiProperty({ description: '유저 닉네임', example: '이뽀또' })
  nickName: string;

  @Expose()
  @ApiProperty({ description: '유저 프로필 사진', example: null })
  profileImage: string;

  @Expose()
  @ApiProperty({ description: '유저 삭제일', example: null })
  deletedAt: Date;

  @Expose()
  @ApiProperty({ description: '유저 마지막 업데이트일', example: '2021-07-01T00:00:00.000Z' })
  updatedAt: Date;

  @Expose()
  @ApiProperty({ description: '유저 생성일', example: '2021-07-01T00:00:00.000Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ description: '약관동의정보' })
  @Type(() => GetUserTermsOfServiceAgreementItem)
  UserTermsOfServiceAgreement: GetUserTermsOfServiceAgreementItem[];
}
