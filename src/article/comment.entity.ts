import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ArticleEntity } from './article.entity';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public body: string;

  @ManyToOne((type) => ArticleEntity, (article) => article.comments)
  public article: ArticleEntity;

  @ManyToOne((type) => UserEntity, (user) => user.articles)
  public author: UserEntity;
}
