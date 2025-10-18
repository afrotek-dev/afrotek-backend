import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ default: 'customer' })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
