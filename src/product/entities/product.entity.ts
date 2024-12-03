import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryColumn()
    name: string

    @Column()
    category_id: number
}
