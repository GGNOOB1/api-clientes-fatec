import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'state' })
export default class State {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
