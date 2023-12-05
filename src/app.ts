import express, { Express } from "express";
import "express-async-errors";
import { userRouter } from "./routes/UserRouter";
import { sequelize } from "./database/ConnectDB";
import { auth } from "./routes/Auth";
import cookieParser from "cookie-parser";
import "cors";
import { playlistRouter } from "./routes/PlaylistRouter";
import { songRouter } from "./routes/SongRouter";
import { errorHandler } from "./middleware/errorHandler";
import path from "path";
import * as dotenv from "dotenv";

const app: Express = express();
const connectDB = sequelize;
// middlewares
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/", auth);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", songRouter);
app.use("/api/v1/", playlistRouter);
app.use(errorHandler);

let PORT = process.env.PORT || 3000;
async function start() {
    try {
        await connectDB.authenticate();
        // sincroniza as tabelas de acordo com os modelos definidos
        // caso haja um modelo sem sua respectiva tabela, esta será criada
        await connectDB.sync();
        app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
    } catch (error) {
        console.log("Something went wrong!");
    }
}

start();
