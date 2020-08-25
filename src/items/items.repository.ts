import { Repository, EntityRepository } from "typeorm";
import { Item } from "./items.entity";
import { GetItemsFilterDto } from "./dto/get-items-filter.dto";
import { User } from "src/auth/user.entity";
import { CreateItemDto } from "./dto/create-item.dto";

@EntityRepository(Item)
export class ItemsRepository extends Repository<Item> {

    async getItems(filterDto: GetItemsFilterDto, user: User): Promise<Item[]>{
        const { from_date, to_date, search } = filterDto;
        const query = this.createQueryBuilder('item');
        query.where('item.userId = :userId', { userId: user.id });
        if (from_date || to_date) {
            query.andWhere('item.added_on BETWEEN :from_date AND :to_date',{ from_date, to_date });
        }
        if (search) {
            query.andWhere('item.name ILIKE :search OR item.description ILIKE :search', { search: `%${search}%`});
        }
        const items = query.getMany();
        return items;
    }

    async createItem(createItemDto: CreateItemDto, user: User): Promise<Item>{
        const { name, description, qty, rate } = createItemDto;
        const item = new Item();
        item.name = name;
        item.description = description;
        item.qty = qty;
        item.rate = rate;
        item.total = qty * rate;
        // item.added_on = new Date();
        item.user = user;
        await item.save();
        delete item.user;
        return item;
    }
}