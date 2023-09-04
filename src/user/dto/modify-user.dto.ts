import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class ModifyUserRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '닉네임' })
  nickName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '프로필 이미지' })
  profileImage?: string;
}

@Exclude()
export class ModifyUserResponse {
  @Expose()
  @ApiProperty({ description: '회원 아이디' })
  userId: number;
}
