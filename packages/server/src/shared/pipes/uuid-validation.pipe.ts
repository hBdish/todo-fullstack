import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (!validate(value)) {
      throw new BadRequestException(
        'Id in the parameters is not passed in the Uuid format',
      );
    }

    return value;
  }
}
