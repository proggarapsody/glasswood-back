import { ICryptoService } from '@application/adapters/crypto-service.interface'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
@Injectable()
export class CryptoService implements ICryptoService {
  rounds = 10

  async hash(hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, this.rounds)
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword)
  }
}
