import { DataTypes } from "sequelize";
import { Model, Column, Table, HasMany } from "sequelize-typescript";
import Playlist from "./Playlist";

// estrutura da tabela de usuários
@Table({ timestamps: false, tableName: "users" })
export default class User extends Model<User> {
    // atributo email
    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            // validações antes de salvar no banco de dados
            isEmail: {
                msg: "Please, provide a valid email.", // verifica se foi passado um email
            },
            notEmpty: {
                msg: "Email can not be an empty field.", // verifica se foi passada uma string vazia
            },
            notNull: {
                msg: "Email must be provided.", // verifica o campo passado é nulo
            },
        },
    })
    email!: string; // obrigatório passar

    // atributo password
    @Column({
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            len: [6, 64], // tamanho mínimo do password
            notEmpty: {
                msg: "Password can not be an empty field.", // não pode passar string vazia
            },
            notNull: {
                msg: "Password must be provided.", // não pode passar um campo vazio
            },
        },
    })
    password!: string; // obrigatório passar

    // atributo nome do usuário
    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Username can not be an empty field.", // não pode passar string vazia
            },
            notNull: {
                msg: "Username must be provided.", // não pode passar um campo vazio
            },
        },
    })
    username!: string; // obrigatório

    // atributo data de nascimento
    @Column({
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
            isBefore: new Date().toDateString(),
            notEmpty: {
                msg: "Date of birth can not be an empty field.", // não pode passar string vazia
            },
            notNull: {
                msg: "Date of birth must be provided.", // não pode passar um campo vazio
            },
        },
    })
    date_of_birth!: Date; // obrigatório

    // atributo gênero
    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Gender can not be an empty field.", // não pode passar string vazia
            },
            notNull: {
                msg: "Gender must be provided.", // não pode passar um campo vazio
            },
            isIn: [["m", "f", "nb", "o", "pns"]], // só aceita esses valores predeterminados
        },
    })
    gender!: string; // obrigatório

    // relacionamento com playlists 1:n
    @HasMany(() => Playlist)
    playlists?: Playlist[]; // pode ser um campo vazio
}
