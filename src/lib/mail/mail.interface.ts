/**
 * 이메일 전송 서비스 인터페이스
 *
 * 해당 인테페이스를 구현한 클래스는 이메일 전송 서비스로 사용할 수 있다.
 * 구현체는 mail/sender 디렉토리에 위치해야 한다.
 */
export interface MailSender {
  /**
   * 메일 전송
   * @param to 받는 사람
   * @param subject 제목
   * @param body 내용
   * @param textBody 퓨어 텍스트 내용
   */
  send(to: string, subject: string, body: string, textBody?: string): Promise<void>;
}
