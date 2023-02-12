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
    unique: true,
  })
  name: string;

  @ManyToOne(() => User, (parent) => parent.children, { eager: true })
  parent: User;

  @ManyToMany(() => Document, { eager: true })
  @JoinTable()
  documents: Document[];

  @ManyToMany(() => Event, { eager: false })
  events: Event[];
}
