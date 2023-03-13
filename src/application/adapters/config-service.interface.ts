export abstract class IDbConfig {
  abstract getDatabaseHost(): string

  abstract getDatabasePort(): number

  abstract getDatabaseUser(): string

  abstract getDatabasePassword(): string

  abstract getDatabaseName(): string

  abstract getDatabaseSchema(): string

  abstract getDatabaseSync(): boolean
}

export abstract class IJwtConfig {
  abstract getJwtConfig(): {
    secret: string
    expirationTime: string
    refreshSecret: string
    refreshExpirationTime: string
  }
}
