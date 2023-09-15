import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import State from './state';

@Entity({ name: 'city' })
export default class City {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public name: string;

  @OneToOne(() => State, { eager: true })
  @JoinColumn({ name: 'state_id' })
  public state: State;
}
