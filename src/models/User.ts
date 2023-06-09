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
            isEmail: true,
            notEmpty: true,
        },
    })
    email!: string;

    @Column({
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 64],
        },
    })
    password!: string;

    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    })
    username!: string;

    @Column({
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
            isBefore: new Date().toDateString(),
        },
    })
    date_of_birth!: Date;

    @Column({
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [["m", "f", "nb", "o", "pns"]],
        },
    })
    gender!: string;

    @HasMany(() => Playlist)
    playlists?: Playlist[];
}
