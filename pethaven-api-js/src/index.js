import { createServer } from "./server.js";
import config from "./config.js";

const server = createServer();

server.listen(config.port, () => {
  console.log(`api running on http://localhost:${config.port}`);
  console.log(`USER_ID: `, process.env.USER_ID);
});
