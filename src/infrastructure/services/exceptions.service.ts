import {
  IExceptionsService,
  IFormatExceptionMessage,
} from '@application/adapters/exceptions-service.interface'
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class ExceptionsService implements IExceptionsService {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data)
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data)
  }
  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data)
  }
  UnauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data)
  }
}
