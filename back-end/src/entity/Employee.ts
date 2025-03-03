import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Employee {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  position!: string;

  @Column()
  department!: string;

  @Column()
  joiningDate!: Date;

  @Column()
  salary!: number;
}
