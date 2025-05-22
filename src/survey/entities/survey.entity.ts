import { Entity, PrimaryGeneratedColumn , Column, CreateDateColumn } from "typeorm";

@Entity({name: "survey"})

export class Survey {
    @PrimaryGeneratedColumn('uuid')
        id: string;
    
    @Column('text')
        location:string;

    @Column({type: 'character varying', length: 200})
        hospital_name: string;

    @Column('text')
        handled_problems: string;
    
    @CreateDateColumn({type: 'timestamp'})
        created_at: Date;

    @Column({ type: 'text', nullable: true })
  imag_url: string;

    @Column({type: 'text', nullable: true })
        file_path: string;
}