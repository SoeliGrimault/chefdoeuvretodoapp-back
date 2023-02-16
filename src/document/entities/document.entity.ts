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
    unique: false,
  })
  name: string;

  @Column({
    nullable: true,
    unique: false,
  })
  picture: string;

  @Column({
    nullable: true,
  })
  childId: string;

  @ManyToOne(() => Category, (cat) => cat.documents, { eager: true })
  category: Category;

  @ManyToOne(() => User, (usr) => usr.document, { eager: true })
  user: User;

  @ManyToMany(() => Child, (child) => child.documents, { eager: false })
  children: Child[];
}
