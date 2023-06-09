import { DataTypes } from "sequelize";
import {
    Model,
    Column,
    Table,
    BelongsTo,
    BelongsToMany,
    ForeignKey,
} from "sequelize-typescript";
import Song from "./Song";
import User from "./User";
import SongPlaylist from "./SongPlaylist";

@Table({ tableName: "playlists", timestamps: false })
export default class Playlist extends Model<Playlist> {
    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataTypes.TEXT,
    })
    duration?: number;

    @BelongsTo(() => User)
    user!: User;

    @Column({ type: DataTypes.INTEGER })
    @ForeignKey(() => User)
    userId!: number;

    @BelongsToMany(() => Song, () => SongPlaylist)
    songs?: Array<Song & { SongPlaylist: SongPlaylist }>;
}
