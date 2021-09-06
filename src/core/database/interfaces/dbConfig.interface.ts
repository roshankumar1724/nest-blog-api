export interface IDatabaseConfigAttributes {
  name?: string;
  host?: string;
  port?: number | string;
  username?: string;
  password?: string;
  database?: string;
  dialect?: string;
  urlDatabase?: string;
  logging?: boolean;
  synchronize?: boolean;
  entities?: string[];
  migrations?: string[];
  subscribers?: string[];
  cli?: ICliConfigObject;
}

export interface ICliConfigObject {
  entitiesDir?: string;
  migrationsDir?: string;
  subscribersDir: string;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}