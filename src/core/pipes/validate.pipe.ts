import { ArgumentMetadata, BadRequestException, Injectable, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

@Injectable()
export class ValidatePipe extends ValidationPipe {
  public async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new UnprocessableEntityException(
          this.handleError(error.message)
        );
      }
    }
  }

  private handleError(errors) {
    return errors.map(error => error.constraints);
  }
}
