import { ApiProperty } from '@nestjs/swagger';
import { UserVerificationType } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmVerificationRequest {
  @ApiProperty({ description: '인증 요청 아이디', example: '123h12hj3j1' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: '인증 코드', example: '123456' })
  @IsNotEmpty()
  verificationCode: string;
}

@Exclude()
export class ConfirmVerificationResponse {
  @Expose()
  @ApiProperty({ description: '인증 요청 결과 아이디', example: '123h12hj3j1' })
  id: string;

  @Expose()
  @ApiProperty({ description: '인증 결과', example: true })
  result: boolean;

  @Expose()
  @ApiProperty({ description: '남은 인증가능 횟수', example: 5 })
  remaining: number;

  @Expose()
  @ApiProperty({ description: '인증 타입', example: UserVerificationType.EMAIL })
  verificationType: UserVerificationType;

  @Expose()
  @ApiProperty({ description: '이메일 주소 (인증타입이 이메일인경우 필수)', example: 'test@naver.com' })
  emailAddress?: string;

  @Expose()
  @ApiProperty({ description: '요청 유저 아이디 (단순 기록용)', example: 1 })
  userId?: number;
}
