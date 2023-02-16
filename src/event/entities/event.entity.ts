import { Category } from 'src/category/entities/category.entity';
import { Child } from 'src/children/entities/child.entity';
import { Document } from 'src/document/entities/document.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    unique: false,
  })
  name: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
  })
  postalCode: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: false,
  })
  date: string;

  @Column({
    nullable: false,
  })
  time: string;

  @Column({
    nullable: true,
  })
  description: string;

  @ManyToOne(() => Category, (cat) => cat.event, { eager: true })
  category: Category;

  @ManyToOne(() => User, (usr) => usr.event, { eager: true })
  organisateur: User;

  @ManyToMany(() => Child, (child) => child.events, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  participants: Child[];
}
