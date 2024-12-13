import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

function IsValidId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'number' && Number.isInteger(value) && value >= 1
          );
        },
        defaultMessage(args: ValidationArguments) {
          const value = args.value;
          if (typeof value !== 'number' || !Number.isInteger(value)) {
            return 'ID must be an integer.';
          }
          if (value < 1) {
            return 'ID must not be less than 1.';
          }
          return 'Invalid ID.';
        },
      },
    });
  };
}

export class FriendQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsValidId({
    message: 'ID must be a valid integer and greater than or equal to 1.',
  })
  id?: number;

  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  @MinLength(4, { message: 'Name must be at least 4 characters long.' })
  @MaxLength(20, { message: 'Name must be at most 20 characters long.' })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: 'Name must only contain alphabetic characters and spaces.',
  })
  name?: string;
}
