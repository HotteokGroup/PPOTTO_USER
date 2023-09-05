import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AgreeTermsOfServiceCommand } from './command/agree-terms/agree-terms.command';
import { GetTermsOfServiceQuery } from './query/get-terms.query';

@Injectable()
export class TermsOfServiceService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * 약관 동의
   */
  async agreeTermsOfService(params: AgreeTermsOfServiceCommand) {
    await this.commandBus.execute(new AgreeTermsOfServiceCommand(params));
  }

  /**
   * 약관 리스트
   */
  async getTermsOfServiceList() {
    return this.queryBus.execute(new GetTermsOfServiceQuery());
  }
}
