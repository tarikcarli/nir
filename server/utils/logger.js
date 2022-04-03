import pino from "pino";
import config from "./config.js";
const logger = pino({ level: config.LOG_LEVEL, prettyPrint: config.NODE_ENV === "development" });
const ptrace = logger.trace.bind(logger);
const pdebug = logger.debug.bind(logger);
const pinfo = logger.info.bind(logger);
const pwarn = logger.warn.bind(logger);
const perror = logger.error.bind(logger);
const pfatal = logger.fatal.bind(logger);
pinfo(config);
export { ptrace, pdebug, pinfo, pwarn, perror, pfatal };
