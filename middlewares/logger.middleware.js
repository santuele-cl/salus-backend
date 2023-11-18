import { promises, existsSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

import { format } from "date-fns";
import { v4 as uuid } from "uuid";

const __dirname = dirname(fileURLToPath(import.meta.url));

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "MMddyyyy\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!existsSync(join(__dirname, "..", "logs"))) {
      await promises.mkdir(join(__dirname, "..", "logs"));
    }
    await promises.appendFile(
      join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (error) {
    console.error(error);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "request.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logEvents, logger };
