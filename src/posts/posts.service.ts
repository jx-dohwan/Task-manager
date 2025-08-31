import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsRepository } from './repository/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto): Promise<Post[]> {
    const postEntity = createPostDto.toEntity();
    return await this.postsRepository.create(postEntity);
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.findAll();
  }

  async findOne(id: number):Promise<Post> {
    const post = await this.postsRepository.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with Id ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto:UpdatePostDto): Promise<Post | null> {
    const existingPost = await this.findOne(id);
    const updateData = updatePostDto.toEntity();
    return await this.postsRepository.update(id, updateData);
  }

  async remove(id:number): Promise<void> {
    await this.findOne(id);
    await this.postsRepository.remove(id);
  }

}
