import { DataTypes } from "sequelize";
import { Model, Table, Column, ForeignKey } from "sequelize-typescript";
import Song from "./Song";
import Playlist from "./Playlist";

// tabela intermediária do relacionamento n:n entre músicas e playlists
@Table({ tableName: "songs_playlists", timestamps: false })
export default class SongPlaylist extends Model {
    @Column({
        type: DataTypes.INTEGER,
    })
    @ForeignKey(() => Song)
    songID!: number;

    @Column({
        type: DataTypes.INTEGER,
    })
    @ForeignKey(() => Playlist)
    playlistID!: number;
}
