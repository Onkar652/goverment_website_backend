import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('uploads')
export class Upload {
    filePath(__dirname: string, arg1: string, arg2: string, filePath: any) {
      throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Column('json', { nullable: true })
    metadata: object;
    
    @Column('text', { nullable: true })
    file: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}
