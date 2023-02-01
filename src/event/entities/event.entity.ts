import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  address?: string;

  @Column({
    nullable: true,
  })
  postalCode?: string;

  @Column({
    nullable: true,
  })
  city?: string;

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
  description?: string;
}
