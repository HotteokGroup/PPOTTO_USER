import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

@Exclude()
export class CreateUserCommand {
  @Expose()
  @IsEmail()
  @ApiProperty({ description: '가입할 이메일', example: 'test@email.com' })
  readonly email: string;
}

export class CreateUserCommandResult {
  @ApiProperty({ description: '생성된 고객 아이디', example: 0 })
  readonly id: number;
}
