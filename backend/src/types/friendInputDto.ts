import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FriendInputDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Friend name', example: 'John Doe' })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: 'Name must only contain alphabetic characters',
  })
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  @MaxLength(20, { message: 'Name must not exceed 20 characters' })
  name: string;

  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty({ description: 'Friendship level', example: 5 })
  friendLevel: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty({ description: 'Fat level', example: 3 })
  fatLevel: number;
}
