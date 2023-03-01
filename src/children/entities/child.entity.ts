import { Document } from 'src/document/entities/document.entity';
import { Event } from 'src/event/entities/event.entity';
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
export class Child {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    unique: false,
  })
  name: string;

  @ManyToOne(() => User, (parent) => parent.children, {
    eager: true,
    onDelete: 'CASCADE',
  })
  parent: User;

  @ManyToMany(() => Document, (document) => document.children, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  documents: Document[];

  @ManyToMany(() => Event, (event) => event.participants, {
    eager: false,
    onDelete: 'CASCADE',
  })
  events: Event[];
}
