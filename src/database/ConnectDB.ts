import path from "path";
import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: `${__dirname}/App.db`,
    models: [path.resolve(__dirname, "../models")],
});
