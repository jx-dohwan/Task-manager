import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsRepository extends BaseRepository<Post> {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {
    super(postRepo);
  }

  async findByAuthor(author: string): Promise<Post[]> {
    return await this.findBy({ author } as any);
  }

  async findPublishedPosts(): Promise<Post[]> {
    return await this.repository.find({
      where: { isPublished: true },
      order: { createdAt: 'DESC' }
    });
  }

  async togglePublishStatus(id: number): Promise<Post | null> {
    const post = await this.findOne(id);
    if (!post) return null;

    return await this.update(id, { isPublished: !post.isPublished } as Partial<Post>);
  }
}
