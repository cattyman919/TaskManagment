import { PriorityLevel, TaskStatus } from 'tasks/enums/task.enums';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column({ type: 'text' })
  public description: string;

  @Column({ type: 'enum', enum: PriorityLevel })
  public priority: PriorityLevel;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TO_DO })
  public status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  public user: User;
}
