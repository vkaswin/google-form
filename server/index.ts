import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./src/database/config";
import Routes from "./src/routes";
dotenv.config();

const port = process.env.PORT;

const app: Express = express();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/form", express.static("public/form"))
  .use("/template", express.static("public/template"))
  .use(Routes);

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
