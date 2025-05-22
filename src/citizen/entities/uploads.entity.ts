import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('uploads')
export class Upload {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Column('json', { nullable: true })
    metadata: Text;
    
    @Column('text', { nullable: true })
    file: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}
