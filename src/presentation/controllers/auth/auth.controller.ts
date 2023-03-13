import { LoginUseCase } from '@application/use-cases/auth/login.use-case'
import { RefreshTokenUseCase } from '@application/use-cases/auth/refresh-token.use-case'
import { SignupUseCase } from '@application/use-cases/auth/signup.use-case'
import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

import { LoginDto, SignupDto } from './auth.dto'

@Controller('auth')
@ApiTags('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(LoginDto, SignupDto)
export class AuthController {
  constructor(
    private readonly _loginUseCase: LoginUseCase,
    private readonly _signupUseCase: SignupUseCase,
    private readonly _refreshTokenUseCase: RefreshTokenUseCase
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const res = await this._loginUseCase.execute(dto)
    response.cookie('Authorization', res.accessToken, {
      httpOnly: true,
    })
    response.cookie('Refresh', res.refreshToken, {
      httpOnly: true,
    })
  }

  @Post('signup')
  async signup(@Body() dto: SignupDto, @Res({ passthrough: true }) response: Response) {
    const res = await this._signupUseCase.execute(dto)

    response.cookie('Authorization', res.accessToken, {
      httpOnly: true,
    })
    response.cookie('Refresh', res.refreshToken, {
      httpOnly: true,
    })
  }

  @Post('refresh')
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const res = await this._refreshTokenUseCase.execute({
      refreshToken: request.cookies.Refresh,
      accessToken: request.cookies.Authorization,
    })

    response.cookie('Refresh', res.refreshToken, {
      httpOnly: true,
    })
  }
}
