// src/files/entities/file.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  file_path: string;

  @Column()
  file_type: string;

  @Column()
  file_size: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  uploaded_at: Date;

  @Column({ nullable: true })
  filepublic_url: string;

}
