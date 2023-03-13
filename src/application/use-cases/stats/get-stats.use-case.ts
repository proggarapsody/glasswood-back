import { IStatsRepository } from '@application/repositories/stats-repo.interface'
import { Stats } from '@domain/entities/stats.entity'
import { Injectable } from '@nestjs/common'

import { IUseCase } from '../use-case.interface'

interface GetStatsQuery {
  from: Date
  to: Date
}

@Injectable()
export class GetStatsUseCase implements IUseCase<GetStatsQuery, Stats> {
  constructor(private readonly _repository: IStatsRepository) {}

  async execute(command: GetStatsQuery): Promise<Stats> {
    return await this._repository.get(command)
  }
}
