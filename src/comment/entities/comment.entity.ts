import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity.js';
import { Post } from '../../post/entities/post.entity.js';

@Table({ tableName: 'Comments', timestamps: true, paranoid: true })
export class Comment extends Model {
  @Column({ type: DataType.TEXT, allowNull: false })
  declare texto: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  declare autor: User;

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare postId: number;

  @BelongsTo(() => Post)
  declare post: Post;
}
