import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

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
}
