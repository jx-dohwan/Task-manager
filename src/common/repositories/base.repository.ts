import {Repository, FindOptionsWhere, FindManyOptions} from 'typeorm';
import {BaseEntity} from '../entities/base.entity';

export abstract class BaseRepository<T extends BaseEntity> {
    protected repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    async create(entityData: Partial<T>):Promise<T[]> {
        const entity = this.repository.create(entityData as any);
        return await this.repository.save(entity);
    }

    async findAll(options?: FindManyOptions<T>): Promise<T[] > {
        return await this.repository.find({
            order: {createdAt: 'DESC'},
            ...options
        } as FindManyOptions<T>);
    }

    async findOne(id:number): Promise<T | null> { // 타입 오류를 없애기 위해서 타입에 null을 추가하기는 하였지만, 이것이 옳은 방법인가? return 문에서 대처를 해야하지 않을까?
        return await this.repository.findOne({where:{id}} as any);
    }

    async findBy(where: FindOptionsWhere<T>): Promise<T[]> {
        return await this.repository.find({where} as any);
    }

    async update(id: number, updateData: Partial<T>):Promise<T | null> {
        await this.repository.update(id, updateData as any);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async count(where?: FindOptionsWhere<T>): Promise<number> {
        return await this.repository.count({where} as any);
    }

    async exists(where: FindOptionsWhere<T>): Promise<boolean> {
        const count = await this.repository.count({where} as any);
        return count > 0;
    }
}