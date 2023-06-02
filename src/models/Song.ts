import { DataTypes } from "sequelize";
import { sequelize } from "../database/ConnectDB";

export const Song = sequelize.define(
    "songs",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        duration: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        author: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        album: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { timestamps: false }
);
