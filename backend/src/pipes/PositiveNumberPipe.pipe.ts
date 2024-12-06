import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveNumberPipe implements PipeTransform {
  constructor(private readonly fieldName: string) {}

  transform(value: any) {
    const numberValue = parseInt(value);
    console.log(
      '🚀 ~ PositiveNumberPipe ~ transform ~ numberValue:',
      typeof numberValue,
    );
    console.log(
      '🚀 ~ PositiveNumberPipe ~ transform ~ numberValue:',
      numberValue,
    );

    if (isNaN(numberValue) || numberValue <= 0) {
      throw new BadRequestException(
        `${this.fieldName} must be a positive number.`,
      );
    }

    return numberValue;
  }
}

export function PositiveNumberPipeFactory(fieldName: string) {
  return new PositiveNumberPipe(fieldName);
}
