import { ApiProperty } from '@nestjs/swagger';
import { UserVerificationType } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';

export class SendVerificationRequest {
  @ApiProperty({ description: '인증 타입', example: UserVerificationType.EMAIL })
  @IsEnum(UserVerificationType)
  @IsNotEmpty()
  verificationType: UserVerificationType;

  @ApiProperty({ description: '이메일 주소 (인증타입이 이메일인경우 필수)', example: 'test@naver.com' })
  @ValidateIf((o) => o.verificationType === UserVerificationType.EMAIL)
  @IsEmail()
  @IsNotEmpty()
  emailAddress?: string;

  @ApiProperty({ description: '요청 유저 아이디 (단순 기록용)', example: 1 })
  @IsNumber()
  @IsOptional()
  userId?: number;
}
@Exclude()
export class SendVerificationResponse {
  @Expose()
  @ApiProperty({ description: '인증 요청 결과 아이디', example: '123h12hj3j1' })
  @IsNumber()
  id: string;
}
