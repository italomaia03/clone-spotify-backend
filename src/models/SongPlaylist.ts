import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "../database/ConnectDB";
import { Song } from "./Song";
import { Playlist } from "./Playlist";

interface SongPlaylistAttributes {
    songID: number;
    playlistID: number;
}

export const SongPlaylist: ModelDefined<
    SongPlaylistAttributes,
    SongPlaylistAttributes
> = sequelize.define("SongPlaylist", {
    songID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Song,
            key: "id",
        },
    },
    playlistID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Playlist,
            key: "id",
        },
    },
});
