import dotenv from "dotenv"

dotenv.config()

type Config = {
  port: number;
  databaseUser: string;
  databaseHost: string;
  databaseName: string;
  databasePassword: string;
  databasePort: number;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  databaseUser: process.env.DB_USER || "postgres",
  databaseHost: process.env.DB_HOST || "localhost",
  databaseName: process.env.DB_NAME || "postgres",
  databasePassword: process.env.DB_PASSWORD || "",
  databasePort: Number(process.env.DB_PORT) || 5432,
}

export default config
