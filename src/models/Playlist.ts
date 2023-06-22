import { DataTypes } from "sequelize";
import {
    Model,
    Column,
    Table,
    BelongsTo,
    BelongsToMany,
    ForeignKey,
    Default,
} from "sequelize-typescript";
import Song from "./Song";
import User from "./User";
import SongPlaylist from "./SongPlaylist";

@Table({ tableName: "playlists", timestamps: false })
export default class Playlist extends Model<Playlist> {
    @Default(`My playlist #${Math.floor(Math.random() * 100)}`)
    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Playlist name must be provided.",
            },
            notEmpty: {
                msg: "Playlist name can not be an empty string.",
            },
        },
    })
    name?: string;

    @Column({
        type: DataTypes.TEXT,
    })
    description?: string;

    @BelongsTo(() => User, "userId")
    user!: User;

    @ForeignKey(() => User)
    userId!: number;

    @BelongsToMany(() => Song, () => SongPlaylist)
    songs?: Array<Song & { SongPlaylist: SongPlaylist }>;
}
