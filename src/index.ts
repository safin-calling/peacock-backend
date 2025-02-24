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

app.get("/", (req, res) => {
    res.send(
      `Hello, this is the root route for the Peacock API \n 
      visit Postman to test the endpoints \n 
      https://www.postman.com/lunar-module-candidate-22737456/my-workspace/collection/rb32uma/peacock?action=share&creator=42555517`
    );
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
