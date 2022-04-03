import pg from "pg";
import format from "pg-format";
import config from "./config.js";
import { pdebug, perror, pfatal } from "./logger.js";
const Pool = pg.Pool;
/** @type {import("pg").Pool} */
let pool;
/** @type {import("pg").PoolClient} */
let psClient;
/** @type {{[key:string]:((message:string) => void)[]}} */
const listeners = {};

async function pStart() {
  pdebug("pStart start");
  try {
    pool = new Pool({
      host: config.DB_HOST,
      password: config.DB_PASSWORD,
      user: config.DB_USERNAME,
      database: config.DB_DATABASE,
      port: config.DB_PORT,
    });
    pool.on("error", (err) => {
      perror(`pool.on.error: ${err}`);
    });
    pool.on("connect", (client) => {
      pdebug("pool.on.connect: bind client notice event payload to console");
      client.on("notice", (payload) => pdebug(`notice: ${payload.message}`));
    });
    psClient = await pool.connect();
  } catch (err) {
    pfatal(`pStart.catch: ${err.message}`);
    process.exit(1);
  }
  pdebug("pStart end");
}

async function pEnd() {
  pdebug("pEnd start");
  try {
    psClient.release();
    await pool.end();
  } catch (err) {
    pfatal(`pEnd catch: ${err}`);
    process.exit(1);
  }
  pdebug("pEnd end");
}

/**
 * @type {(
 *  first:{
 *    client?: import("pg").PoolClient,
 *    sql:string,
 *    identifiers?:any[],
 *    parameters?:any[]
 *  }) => Promise<import("pg").QueryResult<any>>}
 */
async function pQuery({ client, sql, identifiers, parameters }) {
  pdebug("pQuery start");
  let formattedSql;
  if (identifiers) {
    formattedSql = format(sql, ...identifiers);
  } else {
    formattedSql = sql;
  }
  let pRes;
  if (client) {
    pRes = await client.query(formattedSql, parameters || []);
  }
  if (!client) {
    pRes = await pool.query(formattedSql, parameters || []);
  }
  pdebug("pQuery end");
  return pRes;
}

/** @type {(txFunc:(client:import("pg").PoolClient) => Promise<any>) => Promise<any>} */
async function pQueryTx(txFunc) {
  pdebug("pQueryTx started");
  /** @type {import("pg").PoolClient} */
  let client;
  try {
    client = await pool.connect();
    await pQuery({ client, sql: "BEGIN;" });
    const txResult = await txFunc(client);
    await pQuery({ client, sql: "COMMIT;" });
    return txResult;
  } catch (err) {
    perror(`pQueryTx.catch: ${err}`);
    await pQuery({ client, sql: "ROLLBACK;" });
    throw err;
  } finally {
    client.release();
    pdebug("pQueryTx end");
  }
}

/** @type {(channel:string,payload:string) => Promise<void>} */
async function pPublish(channel, payload) {
  pdebug("pPublish %o", { channel, payload });
  await pQuery({
    sql: "SELECT pg_notify($1, $2);",
    parameters: [channel, payload],
  });
}

/** @type {(channel:string,sFunc:(message:string) => void) => Promise<void>} */
async function pSubscribe(channel, sFunc) {
  pdebug("pSubscribe start");
  try {
    await pQuery({ client: psClient, sql: `LISTEN "${channel}";` });
    if (!(channel in listeners)) {
      listeners[channel] = [];
    }
    listeners[channel].push(sFunc);
  } catch (err) {
    perror("pSubscribe.catch: %o", err);
    throw err;
  }
  pdebug("pSubscribe end");
}

/** @type {(channel:string,sFunc:(message:string) => void) => Promise<void>} */
async function pUnsubscribe(channel, sFunc) {
  pdebug("pUnsubscribe start");
  try {
    if (!listeners[channel]) return;
    if (listeners[channel] && listeners[channel].length > 0) {
      listeners[channel] = listeners[channel].filter((e) => e !== sFunc);
    }
    if (listeners[channel] && listeners[channel].length === 0) {
      await pQuery({ client: psClient, sql: `UNLISTEN "${channel}";` });
    }
  } catch (err) {
    perror("pUnsubscribe.catch: %o", err);
    throw err;
  }
  pdebug("pUnsubscribe end");
}

export { pStart, pEnd, pQuery, pQueryTx, pPublish, pSubscribe, pUnsubscribe };
