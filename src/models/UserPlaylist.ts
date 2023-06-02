import { DataTypes } from "sequelize";
import { sequelize } from "../database/ConnectDB";
import { User, Playlist } from "./models";

export const UserPlaylist = sequelize.define(
    "users_playlists",
    {
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: User,
                key: "id",
            },
        },
        playlistID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Playlist,
                key: "id",
            },
        },
    },
    { timestamps: false }
);
