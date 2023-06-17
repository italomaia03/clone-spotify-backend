import express, { Express } from "express";
import "express-async-errors";
import { userRouter } from "./routes/UserRouter";
import { sequelize } from "./database/ConnectDB";
import { auth } from "./routes/Auth";
import * as dotenv from "dotenv";
import { playlistRouter } from "./routes/PlaylistRouter";
import { songRouter } from "./routes/SongRouter";
import { errorHandler } from "./middleware/errorHandler";
// import path from "path";

dotenv.config({});

const app: Express = express();
const connectDB = sequelize;
// middlewares
app.use(express.json());
// app.use(express.static(path.resolve(__dirname, "public")));
app.use("/api/v1/", auth);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", songRouter);
app.use("/api/v1/", playlistRouter);
// app.use("/api/v1/user", playlistRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await connectDB.authenticate();
        await connectDB.sync();
        app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
    } catch (error) {
        console.log("Something went wrong!");
    }
}

start();
