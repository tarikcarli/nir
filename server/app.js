import path from "path";
import express from "express";
import pino from "pino-http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routers/root/router.js";
// import swaggerUi from "swagger-ui-express";
// import specs from "./swagger.js";
import { pdebug, perror } from "./utils/logger.js";
import { sendResponse } from "./utils/sendResponse.js";
import config from "./utils/config.js";
import { startCores } from "./bride/bride.js";
startCores();
const app = express();

app.use(pino({ level: config.LOG_LEVEL, prettyPrint: config.NODE_ENV === "development" }));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.static("dist"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use("/api", router);
// app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const dirname = import.meta.url.replace("file://", "");
app.get(/^(?!\/api).*/, (req, res, next) => {
  if (config.NODE_ENV === "production") {
    sendResponse({ req, res, onlyLog: true });
    res.sendFile(path.join(dirname, "dist", "index.html"), (err) => {
      if (err) {
        next(err);
      }
    });
  }
  if (config.NODE_ENV === "development") {
    sendResponse({ err: new Error("Development server has no web assets"), req, res });
  }
});

app.use("*", (req, res) => {
  try {
    sendResponse({ req, res, responseStatus: 404, responseData: { message: "Not found" } });
  } catch (err) {
    sendResponse({ err, req, res });
  }
});

app.use((err, req, res, next) => {
  try {
    perror(`expressGlobalErrorHandler start ${err}`);
    sendResponse({ err, req, res, responseStatus: 500 });
  } catch (err) {
    perror(`expressGlobalErrorHandler.catch ${err}`);
    sendResponse({ err, req, res, responseStatus: 500 });
  }
  pdebug("expressGlobalErrorHandler end");
});

export { app };
