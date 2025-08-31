import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

export abstract class BaseEntity { // abstract에 대한 설명 필요, 확장 가능한 클래스인가?
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}