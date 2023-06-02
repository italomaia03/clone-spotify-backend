import express, { Express } from "express";
import { router } from "./routes/Router";

const app: Express = express();

// middlewares
app.use(express.json());
app.use("/api/v1/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
