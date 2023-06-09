import express, { Express } from "express";
import { userRouter } from "./routes/UserRouter";
import { sequelize } from "./database/ConnectDB";
import { auth } from "./routes/Auth";
import * as dotenv from "dotenv";
import { playlistRouter } from "./routes/PlaylistRouter";
import { songRouter } from "./routes/SongRouter";

dotenv.config();

const app: Express = express();
const connectDB = sequelize;
// middlewares
app.use(express.json());
app.use("/", auth);
app.use("/api/v1/", userRouter, songRouter);
app.use("/api/v1/user", playlistRouter);

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
