import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { auth } from 'firebase-admin';

export class AuthSignupDto {
  @ApiModelProperty({
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRhODc',
  })
  @IsString()
  @IsNotEmpty()
  token!: string;

  @ApiModelProperty()
  @IsNotEmpty()
  properties!: auth.UpdateRequest;
}

export class AuthSignupResponseDto {
  user!: auth.UserRecord;
}
