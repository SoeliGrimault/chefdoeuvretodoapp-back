import { Document } from 'src/document/entities/document.entity';
import { Event } from 'src/event/entities/event.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Document, (doc) => doc.category, { eager: false })
  documents: Document[];

  @OneToMany(() => Event, (evt) => evt.category, { eager: false })
  event: Event;
}
