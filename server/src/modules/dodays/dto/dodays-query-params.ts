import { DodayQueryParams } from '@doday/lib';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class DodaysQueryParamsDto extends DodayQueryParams {
  @ApiModelProperty({ example: 'React course' })
  @IsNotEmpty()
  @MinLength(3, {
    message:
      'Title is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(50, {
    message:
      'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly name?: string;
}
