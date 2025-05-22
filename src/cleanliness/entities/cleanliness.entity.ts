import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('cleanliness_activities')
export class CleanlinessActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; 

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  file_path: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'date', nullable: true })
  activity_date: string;

  @Column({ nullable: true })
  uploaded_by: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

   @Column({ nullable: true })
  imageUrl: string;

}
