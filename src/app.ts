import express from "express";
import cors from "cors";
import CONFIG from "./config/config";
import errorHandler from "./middlewares/error-handler";
import catchError from "./utils/catch-error";
import HTTP from "./constants/http";
import cookieParser from "cookie-parser";
import router from "./routes/route";
const app = express();
const port = CONFIG.port;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: CONFIG.origin,
    credentials: true,
  })
);

app.get(
  "/",
  catchError(async (req, res, next) => {
    return res.status(HTTP.OK).json({
      status: "Application is starting",
    });
  })
);

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
