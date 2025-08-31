import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('posts') // 해당 entity를 만든다는 정의
export class Post extends BaseEntity {
    @Column({ length: 200 })
    title: string;
  
    @Column({ length: 100 })
    author: string;
  
    @Column('text')
    content: string;
  
    @Column({ default: false })
    isPublished: boolean;
}
