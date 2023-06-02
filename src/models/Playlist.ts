import { DataTypes, Deferrable } from "sequelize";
import { sequelize } from "../database/ConnectDB";

export const Playlist = sequelize.define(
    "playlists",
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
    },
    { timestamps: false }
);
