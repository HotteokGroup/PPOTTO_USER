import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ConfirmVerificationHandler } from './command/confirm-verification/confirm-verification.handler';
import { SendVerificationHandler } from './command/send-verification/send-verification.handler';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { PrismaModule } from '../lib/prisma/prisma.module';

const verificationCommandHandlers = [SendVerificationHandler, ConfirmVerificationHandler];

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [VerificationController],
  providers: [VerificationService, ...verificationCommandHandlers],
})
export class VerificationModule {}
