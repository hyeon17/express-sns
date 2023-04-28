import { DataSource, DataSourceOptions } from "typeorm";
import { typeormConfig } from "./config";

interface ConnectDataBaseOptions {
  config?: Partial<DataSourceOptions>;
  successCallback?: InitializeSuccessCallback;
  errorCallback?: InitializeErrorCallback;
}

interface InitializeSuccessCallback {
  (db?: DataSource): void;
}

interface InitializeErrorCallback {
  (error?: Error): void;
}

function connectDataBase({
  config,
  successCallback,
  errorCallback,
}: ConnectDataBaseOptions) {
  const dataBaseConfig = typeormConfig(config);

  const dataBase = new DataSource(dataBaseConfig);
  initializeDataBase(dataBase, successCallback, errorCallback);

  return dataBase;
}

function initializeDataBase(
  db: DataSource,
  successCallback?: InitializeSuccessCallback,
  errorCallback?: InitializeErrorCallback
) {
  db.initialize()
    .then((db) => successCallback && successCallback(db))
    .catch((error) => errorCallback && errorCallback(error));
}

export const appDataBase = connectDataBase({
  successCallback: () => console.log("DataBase has been initialized!"),
  errorCallback: (error) =>
    console.error("Error during DataBase initialization:", error),
});
