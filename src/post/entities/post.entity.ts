import { Table, Column, Model, DataType, ForeignKey, BelongsTo,  } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity.js';



@Table({ tableName: 'Posts', timestamps: true, paranoid: true })
export class Post extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  declare titulo: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare texto: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare imagem: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  declare autor: User;
}
  