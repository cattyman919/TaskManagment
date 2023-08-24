import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column('text')
  public description: string;

  @Column()
  public priority: PriorityLevel;

  @Column()
  public status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  public user: User;
}

export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum PriorityLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
