import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthSigninDto {
  @ApiModelProperty({
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRhODc',
  })
  @IsString()
  @IsNotEmpty()
  token!: string;
}

export class AuthSigninResponseDto {}
