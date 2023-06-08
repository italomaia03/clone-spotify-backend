import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../database/ConnectDB";
import { Song } from "./Song";
import { SongPlaylist } from "./SongPlaylist";
import { User } from "./User";

interface PlaylistAttributes {
    id: number;
    name: string;
    duration: string;
}

type PlaylistCreationAttributes = Optional<PlaylistAttributes, "id">;

export const Playlist: ModelDefined<
    PlaylistAttributes,
    PlaylistCreationAttributes
> = sequelize.define(
    "Playlist",
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { tableName: "playlist", timestamps: false }
);
Playlist.belongsTo(User);
Playlist.belongsToMany(Song, { through: SongPlaylist });
