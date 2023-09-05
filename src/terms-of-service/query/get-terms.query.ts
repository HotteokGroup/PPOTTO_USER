import { TermsOfService } from '@prisma/client';

export class GetTermsOfServiceQuery {}

export class GetTermsOfServiceQueryResult {
  list: TermsOfService[];

  constructor(params: GetTermsOfServiceQueryResult) {
    Object.assign(this, params);
  }
}
