import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsRepository } from './items.repository';
import { User } from 'src/auth/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './items.entity';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ItemsRepository)
        private itemsRepository: ItemsRepository
    ) {}

    async getItems(filterDto: GetItemsFilterDto, user: User): Promise<Item[]> {
        return this.itemsRepository.getItems(filterDto, user);
    }

    async deleteItem(id: number, user: User): Promise<void> {
        const result = await this.itemsRepository.delete({id, userId: user.id});
        if (result.affected === 0) {
            throw new NotFoundException(`Item with Id ${id} not found`);
        }
    }

    // findOne(id: string): Item {
    //     return this.items.find(item => item.id === id);
    // }
    async createItem(createItemsDto: CreateItemDto, user: User): Promise<Item> {
        return this.itemsRepository.createItem(createItemsDto, user);
    }
}
