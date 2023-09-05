import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { ConfirmVerificationRequest, ConfirmVerificationResponse } from './dto/confirm-verification.dto';
import { SendVerificationRequest, SendVerificationResponse } from './dto/send-verification.dto';
import { VerificationService } from './verification.service';
import { ERROR_CODE, GenerateSwaggerDocumentByErrorCode } from '../lib/exception/error.constant';

@Controller('verification')
@ApiTags('인증')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @ApiOperation({ summary: '인증 요청', description: '인증을 요청합니다. 현재 이메일인증만 지원' })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INVALID_DATA,
    ERROR_CODE.USER_NOT_FOUND,
    { ...ERROR_CODE.INTERNAL_SERVER_ERROR, message: '인증정보 저장에 실패, 유효하지않은 인증유형' },
  ])
  @Post()
  async sendVerification(@Body() data: SendVerificationRequest) {
    return plainToInstance(SendVerificationResponse, await this.verificationService.sendVerification(data));
  }

  @ApiOperation({ summary: '인증 확인', description: '인증을 확인합니다.' })
  @GenerateSwaggerDocumentByErrorCode([
    ERROR_CODE.INTERNAL_SERVER_ERROR,
    ERROR_CODE.INVALID_DATA,
    ERROR_CODE.VERIFICATION_NOT_FOUND,
    ERROR_CODE.VERIFICATION_EXCEED_MAXIMUM_COUNT,
    ERROR_CODE.VERIFICATION_EXPIRED,
  ])
  @Post('/confirm')
  async confirmVerification(@Body() data: ConfirmVerificationRequest) {
    return plainToInstance(ConfirmVerificationResponse, await this.verificationService.confirmVerification(data));
  }
}
