import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export const ValidatorPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    const formattedErrors = errors.map((err) => {
      const constraints = Object.values(err.constraints || {});
      return constraints.length
        ? `${err.property} - ${constraints.join(', ')}`
        : `${err.property} - error desconocido`;
    });

    return new BadRequestException({
      isSuccess: false,
      code: 400,
      message: formattedErrors,
      data: null,
    });
  },
});
