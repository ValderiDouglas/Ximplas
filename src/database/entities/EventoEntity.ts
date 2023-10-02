import{
    Entity,
    BaseEntity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('evento')
export class EventoEntity extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;
    @Column('text') nome:string;
    @Column('numeric') quantity: number;
    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() UpdatedAt: Date;

}
