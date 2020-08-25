import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/tasks.entity";
import { Item } from "src/items/items.entity";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[]

    @OneToMany(type => Item, task => task.user, { eager: true })
    items: Item[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}