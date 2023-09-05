import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import {
  ConfirmVerificationCommand,
  ConfirmVerificationCommandResult,
} from './command/confirm-verification/confirm-verification.command';
import {
  SendVerificationCommand,
  SendVerificationCommandResult,
} from './command/send-verification/send-verification.command';

@Injectable()
export class VerificationService {
  constructor(private readonly commandBus: CommandBus) {}

  /**
   * 인증 요청
   */
  async sendVerification(params: SendVerificationCommand) {
    return this.commandBus.execute<SendVerificationCommand, SendVerificationCommandResult>(
      new SendVerificationCommand(params),
    );
  }

  /**
   * 인증 확인
   */
  async confirmVerification(params: ConfirmVerificationCommand) {
    return this.commandBus.execute<ConfirmVerificationCommand, ConfirmVerificationCommandResult>(
      new ConfirmVerificationCommand(params),
    );
  }
}
