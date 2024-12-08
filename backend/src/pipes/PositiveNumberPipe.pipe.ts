import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PositiveNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const numberValue = parseInt(value);

    if (isNaN(numberValue) || numberValue <= 0) {
      throw new BadRequestException(
        `${metadata.data} must be a positive number`,
      );
    }

    return numberValue;
  }
}
