import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserByEmailRequest {
  @ApiProperty({ description: '이메일', example: 'test@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '비밀번호', example: '1234' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

@Exclude()
export class LoginUserByEmailResponse {
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
