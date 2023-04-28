import { DataSourceOptions } from "typeorm";

interface TypeOrmConfigFactoryFn {
  (config?: Partial<DataSourceOptions>): DataSourceOptions;
}

export const typeormConfig: TypeOrmConfigFactoryFn = (config) => {
  return {
    type: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      process.env.NODE_ENV === "production"
        ? "dist/entity/*.js"
        : "src/entity/*.ts",
    ],
    logging: true,
    synchronize: true,
    ...(config && { config }),
  };
};
