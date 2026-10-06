import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity.js';
import { Post } from '../../post/entities/post.entity.js';

@Table({ tableName: 'Likes', timestamps: true, paranoid: false })
export class Like extends Model {
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
