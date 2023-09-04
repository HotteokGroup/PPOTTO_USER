export class AgreeTermsOfServiceCommand {
  /** 회원 아이디 */
  readonly userId: number;

  /** 동의할 약관 아이디 리스트 */
  readonly termsOfServiceIds: number[];

  constructor(params: AgreeTermsOfServiceCommand) {
    Object.assign(this, params);
  }
}
