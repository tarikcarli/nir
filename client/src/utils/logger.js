import pino from "pino";
const isDev = process.env.NODE_ENV === "development";

const logger = pino({ browser: { asObject: true }, level: isDev ? "trace" : "fatal", prettyPrint: isDev });

const ptrace = logger.trace.bind(logger);
const pdebug = logger.debug.bind(logger);
const pinfo = logger.info.bind(logger);
const pwarn = logger.warn.bind(logger);
const perror = logger.error.bind(logger);
const pfatal = logger.fatal.bind(logger);

export { ptrace, pdebug, pinfo, pwarn, perror, pfatal };
