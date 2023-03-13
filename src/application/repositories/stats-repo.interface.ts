import { Stats } from '@domain/entities/stats.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class IStatsRepository {
  abstract get(filter: { from: Date; to: Date }): Promise<Stats>
}
