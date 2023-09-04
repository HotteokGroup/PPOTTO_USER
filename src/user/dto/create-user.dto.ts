import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequest {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: '닉네임' })
  @IsNotEmpty()
  @IsString()
  readonly nickName: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

@Exclude()
export class CreateUserResponse {
  @Expose()
  @ApiProperty({ description: '회원 아이디' })
  readonly id: number;
}
