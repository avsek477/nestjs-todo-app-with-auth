import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Item } from './items.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';

@Controller('items')
@UseGuards(AuthGuard())
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    getItems(
        @Query(ValidationPipe) filterDto: GetItemsFilterDto,
        @GetUser() user: User
    ): Promise<Item[]> {
        return this.itemsService.getItems(filterDto, user);
    }

    // @Get(':id')
    // findOne(@Param('id') id): Item {
    //     return this.itemsService.findOne(id);
    // } 

    // @Put(':id')
    // update(
    //     @Param('id') id, 
    //     @Body() updateItemDto: CreateItemDto
    // ): string {
    //     return `Update-${id} Name: ${updateItemDto.name}`;
    // }

    @Delete('/:id')
    deleteItem(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.itemsService.deleteItem(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(
        @Body() createItemDto: CreateItemDto,
        @GetUser() user: User
    ): Promise<Item> {
        return this.itemsService.createItem(createItemDto, user);
        // return `Name: ${createItemDto.name} Desc: ${createItemDto.description}`;
    }
}
