import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('office_amenities')
export class OfficeAmenity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hospital_name: string;

  @Column('text')
  equipment: string;

  @Column('text')
  location: string;

  @Column('text', { nullable: true })
  additional_info: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
