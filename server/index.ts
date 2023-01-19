import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config";
import Routes from "./routes";
dotenv.config();

const port = process.env.PORT;

connectDB();

const app: Express = express();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/thumbnail", express.static("public/form"))
  .use(Routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
