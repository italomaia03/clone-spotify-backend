import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../database/ConnectDB";

interface SongAttributes {
    id: number;
    name: string;
    duration: string;
}

type SongCretionAttributes = Optional<SongAttributes, "id">;

export const Song: ModelDefined<SongAttributes, SongCretionAttributes> =
    sequelize.define(
        "Song",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            duration: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            author: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            album: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        { tableName: "songs", timestamps: false }
    );
