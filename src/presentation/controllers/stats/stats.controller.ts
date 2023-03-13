import { GetStatsUseCase } from '@application/use-cases/stats/get-stats.use-case'
import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import { Stats } from '@domain/entities/stats.entity'
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator'
import { Body, Controller, Get } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger'

import { GetStatsDto } from './stats.dto'
import { StatsPresenter } from './stats.presenter'

@Controller('stats')
@ApiTags('stats')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(StatsPresenter)
export class StatsController {
  constructor(
    private readonly _getStatsUseCase: GetStatsUseCase,
    @InjectMapper()
    private readonly _mapper: Mapper
  ) {}

  @Get('')
  @ApiResponseType(StatsPresenter, false)
  async getStats(@Body() dto: GetStatsDto) {
    const stats = await this._getStatsUseCase.execute(dto)
    return await this._mapper.mapAsync(stats, Stats, StatsPresenter)
  }
}
