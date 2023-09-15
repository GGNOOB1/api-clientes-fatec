/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Generated,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import City from './city';
import Category from './category';

/* eslint-disable no-unused-vars */
@Entity({ name: 'customer' })
export class Customer {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public name: string;

  @Column()
  public address: string;

  @Column()
  public phone: string;

  @Column()
  public birthdate: Date;

  @Column()
  public status: string;

  @Column()
  public email: string;

  @Column()
  public gender: string;

  @OneToOne(() => City, { eager: true })
  @JoinColumn({ name: 'city_id' })
  public city: City;

  @Column()
  public password: string;

  @OneToOne(() => Category)
  public category_id: number;

  @Column()
  public imgpath: string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
