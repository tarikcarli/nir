#!/usr/bin/env node
import { pinfo, pfatal, perror, pdebug } from "./utils/logger.js";
import http from "http";
import { app } from "./app.js";
import { pEnd, pStart } from "./utils/postgres.js";
import config from "./utils/config.js";
import { cleanProceses } from "./bride/processes.js";

const server = http.createServer(app);

const port = normalizePort(config.PORT);
await pStart();
server.listen(port);

function onError(err) {
  perror(`server.on.error: ${err}`);
  if (err.syscall !== "listen") {
    throw err;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  switch (err.code) {
    case "EACCES":
      pfatal(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      pfatal(`${bind} is already in use`);
      process.exit(1);
    default:
      throw err;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  pinfo(`Listening on ${bind}`);
}

server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

async function signalHandler(signal) {
  pdebug(`process.on.${signal} start`);
  try {
    await sEnd(server);
    await pEnd();
    cleanProceses();
    pdebug(`process.on.${signal} end`);
    process.exit(0);
  } catch (err) {
    perror(`process.on.${signal}.catch: ${err}`);
    process.exit(1);
  }
}

/** @type {(server:import("http").Server) => Promise<void>} */
function sEnd(server) {
  pdebug("sEnd start");
  return new Promise((res, rej) => {
    server.close((err) => {
      if (err) rej(err);
      if (!err) res(null);
      pdebug("sEnd end");
    });
  });
}

process.on("SIGPWR", signalHandler);
process.on("SIGTERM", signalHandler);
process.on("SIGINT", signalHandler);
