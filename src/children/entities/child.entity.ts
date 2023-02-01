import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Child {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;
}
