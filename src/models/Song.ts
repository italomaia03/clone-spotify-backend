import { DataTypes } from "sequelize";
import { Model, Table, Column, BelongsToMany } from "sequelize-typescript";
import Playlist from "./Playlist";
import SongPlaylist from "./SongPlaylist";

@Table({ tableName: "songs", timestamps: false })
export default class Song extends Model<Song> {
    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Song name must be provided.",
            },
            notEmpty: {
                msg: "Song name can not be an empty string.",
            },
        },
    })
    name!: string;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "Duration must be an integer.",
            },
            isNumeric: {
                msg: "Duration must be a number.",
            },
            notEmpty: {
                msg: "Duration must receive a value.",
            },
        },
    })
    duration!: number;

    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Author name must be provided.",
            },
            notEmpty: {
                msg: "Author name can not be an empty string.",
            },
        },
    })
    author!: string;

    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Album name must be provided.",
            },
            notEmpty: {
                msg: "Album name can not be an empty string.",
            },
        },
    })
    album!: string;

    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Path must be provided.",
            },
            notEmpty: {
                msg: "Path can not be an empty string.",
            },
        },
    })
    path!: string;

    @BelongsToMany(() => Playlist, () => SongPlaylist)
    playlists?: Array<Playlist & { SongPlaylist: SongPlaylist }>;
}
