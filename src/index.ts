import express, { Express } from "express";
import dotenv from "dotenv";
import startDB from "./db";
import registerRoutes from "./routes";
import { scheduleWeeklyEmails } from "./services/emailService";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
startDB();
registerRoutes(app);

scheduleWeeklyEmails();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
