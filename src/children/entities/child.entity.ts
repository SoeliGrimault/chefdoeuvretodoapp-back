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
export class Child {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToOne(() => User, (usr) => usr.children, { eager: true })
  parent: User;

  @ManyToMany(() => Document, { eager: false, cascade: true })
  @JoinTable()
  documents: Document[];
}
