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
  LOG_METRIC_AVG_DURATION_IN_MS: Number(process.env.LOG_METRIC_AVG_DURATION_IN_MS),
  DETECTION_BATCH_SIZE: Number(process.env.DETECTION_BATCH_SIZE),
  EXTRACTION_BATCH_SIZE: Number(process.env.EXTRACTION_BATCH_SIZE),
  RECOGNITION_BATCH_SIZE: Number(process.env.RECOGNITION_BATCH_SIZE),
  DETECTION_INSTANCE_SIZE: Number(process.env.DETECTION_INSTANCE_SIZE),
  EXTRACTION_INSTANCE_SIZE: Number(process.env.EXTRACTION_INSTANCE_SIZE),
  RECOGNITION_INSTANCE_SIZE: Number(process.env.RECOGNITION_INSTANCE_SIZE),
  CORE_INITIALISATION_DURATION_MS: Number(process.env.CORE_INITIALISATION_DURATION_MS),
};
for (const key in config) {
  if (config[key] == null) {
    throw new Error(`config propery ${key} cannot be null`);
  }
}
export default config;
