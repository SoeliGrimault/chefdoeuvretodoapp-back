import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//4-generation des entités//
@Entity()
export class Category {
  //2-generation de la code id avec une string //
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  //3- generation des autres colonnes de la table//
  @Column({
    nullable: false,
    unique: true,
  })
  name: string;
}
