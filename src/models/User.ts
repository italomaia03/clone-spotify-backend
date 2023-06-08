import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import { sequelize } from "../database/ConnectDB";
import { Playlist } from "./Playlist";

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare username: string;
    declare date_of_birth: Date;
    declare gender: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [6, 64],
            },
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
                isBefore: new Date().toDateString(),
            },
        },
        gender: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: [["m", "f", "nb", "o", "pns"]],
            },
        },
    },
    { tableName: "users", sequelize, timestamps: false }
);
User.hasMany(Playlist, {
    foreignKey: "userID",
});
