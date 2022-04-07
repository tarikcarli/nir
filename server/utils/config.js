/** @typedef {"trace"|"debug"|"info"|"warn"|"error"|"fatal"} LOG_LEVEL */
const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SERVICE_DOMAIN: process.env.SERVICE_DOMAIN,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN),
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_SCHEMA: process.env.DB_SCHEMA,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  NODE_MAILLER_HOST: process.env.NODE_MAILLER_HOST,
  NODE_MAILLER_USERNAME: process.env.NODE_MAILLER_USERNAME,
  NODE_MAILLER_PASSWORD: process.env.NODE_MAILLER_PASSWORD,
  LOG_LEVEL: process.env.LOG_LEVEL,
  LOG_METRIC_AVG_DURATION_IN_MS: Number(process.env.LOG_METRIC_AVG_DURATION_IN_MS) * 2,
  REQUEST_TIMEOUT_IN_MS: Number(process.env.REQUEST_TIMEOUT_IN_MS),
  CORE_PING_INTERVAL_IN_MS: Number(process.env.CORE_PING_INTERVAL_IN_MS),
  PROPERTY_SEPERATOR: process.env.PROPERTY_SEPERATOR,
  LINE_SEPERATOR: process.env.LINE_SEPERATOR,
};
for (const key in config) {
  if (Number.isNaN(config[key]) || config[key] == null) {
    throw new Error(`config propery ${key} cannot be null`);
  }
}
export default config;
