import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: 'Users',timestamps: true, paranoid: true})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;
}

//TODO: underscored true ver se é necessario para separar as colunas com underline 