import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 10 })
  phone_ne: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column('text')
  problem: string;  // Fixed typo here

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;  // Changed to camelCase
}
