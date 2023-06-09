import { DataTypes } from "sequelize";
import { Model, Table, Column, BelongsToMany } from "sequelize-typescript";
import Playlist from "./Playlist";
import SongPlaylist from "./SongPlaylist";

@Table({ tableName: "songs", timestamps: false })
export default class Song extends Model<Song> {
    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataTypes.TIME,
        allowNull: false,
    })
    duration!: number;

    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
    })
    author!: string;

    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
    })
    album!: string;

    @BelongsToMany(() => Playlist, () => SongPlaylist)
    playlists?: Array<Playlist & { SongPlaylist: SongPlaylist }>;
}
