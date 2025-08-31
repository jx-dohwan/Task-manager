import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Post } from "../entities/post.entity";
import { plainToInstance } from "class-transformer";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsBoolean()
    isPublished?: boolean = false;

    toEntity(): Post {
        return plainToInstance(Post, {
            title: this.title,
            author: this.author,
            content: this.content,
            isPublished: this.isPublished ?? false,
        })
    }

}
