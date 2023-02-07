import { Category } from 'src/category/entities/category.entity';
import { Child } from 'src/children/entities/child.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  picture: string;

  @ManyToOne(() => Category, (cat) => cat.documents, { eager: true })
  category: Category;

  @ManyToOne(() => User, (usr) => usr.document, { eager: true })
  user: User;

  @ManyToMany(() => Child, { eager: false })
  children: Child[];
}
