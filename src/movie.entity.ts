import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    director: string;

    @Column('timestamp')
    release_date: Date;

    @Column('int')
    running_time: number;

    @Column()
    language: string;

    @Column('timestampz')
    @CreateDateColumn()
    created_at: Date;

    @Column('timestampz')
    @UpdateDateColumn()
    updated_at: Date;

}