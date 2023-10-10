import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Customer } from './customer';

@Entity({ name: 'delivery_address' })
export default class DeliveryAddress {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public cep: string;

  @Column()
  public number: string;

  @Column()
  public complement: string;

  @Column()
  public reference: string;

  @OneToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
