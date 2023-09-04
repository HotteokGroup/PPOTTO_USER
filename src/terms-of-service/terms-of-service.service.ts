import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AgreeTermsOfServiceCommand } from './command/agree-terms/agree-terms.command';

@Injectable()
export class TermsOfServiceService {
  constructor(private readonly commandBus: CommandBus) {}

  /**
   * 약관 동의
   */
  async agreeTermsOfService(params: AgreeTermsOfServiceCommand) {
    await this.commandBus.execute(new AgreeTermsOfServiceCommand(params));
  }
}
