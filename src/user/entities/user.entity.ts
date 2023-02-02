import { Child } from 'src/children/entities/child.entity';
import { Document } from 'src/document/entities/document.entity';
import { Event } from 'src/event/entities/event.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleEnumType {
  USER = 'user',
  ADMIN = 'admin',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
    length: 60,
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 60,
  })
  password: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: true,
  })
  picture?: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType;

  @OneToMany(() => Document, (doc) => doc.user, { eager: false })
  document: Document;

  @OneToMany(() => Event, (evt) => evt.organisateur, { eager: false })
  event: Event;

  @OneToMany(() => Child, (children) => children.parent, { eager: false })
  children: Child;
}
