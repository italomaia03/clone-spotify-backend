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

// definição da tabela playlists no banco de dados
@Table({ tableName: "playlists", timestamps: false })
export default class Playlist extends Model<Playlist> {
    // atributo nome
    // por padrão, cria uma playlist com o nome My playlist # algum número
    // pode ser editado após a criação
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
    name?: string; // atributo pode ou não ser informado

    // atributo de descrição da playlist
    @Column({
        type: DataTypes.TEXT,
    })
    description?: string; // opcional

    // referência à tabela de usuários
    @BelongsTo(() => User, "userId")
    user!: User;

    // chave estrangeira recebida da tabela de users
    @ForeignKey(() => User)
    userId!: number; // valor informado automaticamente no controlador

    // relacionamento n:n com músicas
    // utiliza tabela intermediária songs_playlists
    @BelongsToMany(() => Song, () => SongPlaylist)
    songs?: Array<Song & { SongPlaylist: SongPlaylist }>; // pode ser um campo vazio
}
