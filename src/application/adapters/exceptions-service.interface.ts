export interface IFormatExceptionMessage {
  message: string
  code_error?: number
}

export abstract class IExceptionsService {
  abstract badRequestException(data: IFormatExceptionMessage): void
  abstract internalServerErrorException(data?: IFormatExceptionMessage): void
  abstract forbiddenException(data?: IFormatExceptionMessage): void
  abstract UnauthorizedException(data?: IFormatExceptionMessage): void
}
