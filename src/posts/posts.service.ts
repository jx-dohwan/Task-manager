import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private idCounter = 1;

  create(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id: this.idCounter++,
      ...createPostDto
    };
    this.posts.push(newPost);
    return newPost;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find(p => p.id === id);
    if (!post) throw new NotFoundException(`${id}`);
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const postIndex = this.posts.findIndex(p => p.id === id);
    if (postIndex > -1) {
      this.posts[postIndex] = {...this.posts[postIndex], ...updatePostDto}
      return this.posts[postIndex]
    } else {
      throw new NotFoundException(`${id}`);
    }
  }

  remove(id: number): void {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex > -1) {
      this.posts.splice(postIndex,1);
    } else {
      throw new NotFoundException(`${id}`);
    }

  }
}
