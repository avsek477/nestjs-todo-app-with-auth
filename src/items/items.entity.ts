import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/auth/user.entity";

@Entity()
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    qty: number;

    @Column("numeric")
    rate: number;

    @Column("numeric")
    total: number;

    @Column({type: "date", default: () => 'CURRENT_TIMESTAMP'})
    added_on: Date;
    
    @ManyToOne(type => User, user => user.tasks, { eager: false })
    user: User;

    @Column()
    userId: number;
}