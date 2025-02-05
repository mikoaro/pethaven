import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config.js";
import session from "express-session";
import v1 from "./routes/v1/index.js";
import "dotenv/config";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .use(
      session({
        secret: "dfsf94835asda",
        resave: true,
        saveUninitialized: true,
      })
    );

  app.get("/health", (req, res) => {
    res.json({ ok: true, environment: config.env });
  });

  app.get("/", async (request, response) => {
    // await checkToken(request);
    response.send("Running code...");
    // response.sendFile(path.join(__dirname, "main.html"));
  });

  app.get("/success", (request, resposne) => {
    resposne.send("Success");
  });

  app.use("/v1", v1);

  return app;
};





