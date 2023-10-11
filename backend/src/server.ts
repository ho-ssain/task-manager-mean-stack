import dotenv from "dotenv";
import express, { Express } from "express";
import connectDB from "./db/db";
import bodyParser from "body-parser";
import listRoute from "./routes/lists.route";
import taskRoute from "./routes/tasks.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//.........................routes........
app.use("/", listRoute);
app.use("/", taskRoute);
//
//
//..........##############.............
//..........##############.............
//..........##############.............

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`[Server]: running at http://localhost:${port}`);
  });
});
