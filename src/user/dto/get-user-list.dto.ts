import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class GetUserListRequest {
  @ApiProperty({ description: '검색할 고객 아이디', default: [1], isArray: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  userId: number[];

  @ApiProperty({ description: '회원 탈퇴 고객 포함 여부', default: false, type: Boolean })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  includeDeletedUser = false;
}

@Exclude()
export class GetUserListItem {
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
}

@Exclude()
export class GetUserListResponse {
  @Expose()
  @ApiProperty({ description: '총 검색 횟수', example: 1 })
  total: number;

  @Expose()
  @ApiProperty({ description: '유저 리스트', type: [GetUserListItem] })
  @Type(() => GetUserListItem)
  list: GetUserListItem[];
}
