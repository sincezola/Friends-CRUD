import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsOptional } from 'class-validator';

export class UpdateFriendDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty({
    description: 'Friendship level',
    example: 5,
    required: false,
  })
  friendLevel: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty({
    description: 'Fat level',
    example: 3,
    required: false,
  })
  fatLevel: number;
}
