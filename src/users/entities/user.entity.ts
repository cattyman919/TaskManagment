import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;
}
