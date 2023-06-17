import { DataTypes } from "sequelize";
import { Model, Column, Table, HasMany } from "sequelize-typescript";
import Playlist from "./Playlist";

@Table({ timestamps: false, tableName: "users" })
export default class User extends Model<User> {
    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Please, provide a valid email.",
            },
            notEmpty: {
                msg: "Email can not be an empty field.",
            },
            notNull: {
                msg: "Email must be provided.",
            },
        },
    })
    email!: string;

    @Column({
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            len: [6, 64],
            notEmpty: {
                msg: "Password can not be an empty field.",
            },
            notNull: {
                msg: "Password must be provided.",
            },
        },
    })
    password!: string;

    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Username can not be an empty field.",
            },
            notNull: {
                msg: "Username must be provided.",
            },
        },
    })
    username!: string;

    @Column({
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
            isBefore: new Date().toDateString(),
            notEmpty: {
                msg: "Date of birth can not be an empty field.",
            },
            notNull: {
                msg: "Date of birth must be provided.",
            },
        },
    })
    date_of_birth!: Date;

    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Gender can not be an empty field.",
            },
            notNull: {
                msg: "Gender must be provided.",
            },
            isIn: [["m", "f", "nb", "o", "pns"]],
        },
    })
    gender!: string;

    @HasMany(() => Playlist)
    playlists?: Playlist[];
}
