import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.email = user?.email;
    this.password = user?.password;
    this.name = user?.name;
  }
}
