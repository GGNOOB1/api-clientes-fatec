import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'category' })
export default class Category {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public nome: string;

  @CreateDateColumn()
  public created_at: string;

  @UpdateDateColumn()
  public updated_at: string;
}
