import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
