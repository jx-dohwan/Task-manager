import { IsBoolean, IsOptional, IsString } from "class-validator";
import { Post } from "../entities/post.entity";

export class UpdatePostDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsOptional()
    @IsBoolean()
    isPublished?: boolean;

    toEntity(): Partial<Post> {
        const entity: Partial<Post> = {}

        if (this.title !== undefined) entity.title = this.title;
        if (this.author !== undefined) entity.author = this.author;
        if (this.content !== undefined) entity.content = this.content;
        if (this.isPublished !== undefined) entity.isPublished = this.isPublished;

        return entity;
    }

}
