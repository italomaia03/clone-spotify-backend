import { DataTypes } from "sequelize";
import { sequelize } from "../database/ConnectDB";
import { Song, Playlist } from "./models";

export const SongPlaylist = sequelize.define(
    "songs_playlists",
    {
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Song,
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
