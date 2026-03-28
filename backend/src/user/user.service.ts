import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1, name: 'Rumesh', email: 'rumeshlahiru@gmail.com',
      passwordHash: '$2a$12$sVP5CmFuqePbwOwiO3BOKe7Kwpl2T5vF3xyiap7D7LP9KXhJlsja.' // Rumesh1234
    },
    {
      id: 2, name: 'Rumesh2', email: 'torumeshlahiru@gmail.com',
      passwordHash: '$2a$10$WJiM2JZ/Ej1sFC.Ym7r9G.Sc671TZq5Q7aNBSLvvCIr7MIs4ucwke' // Rumesh1237
    },
  ];

  async findById(id: number): Promise<User> {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async validateEmailAndPassword(email: string, password: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    if (user) {
      if (await bcrypt.compare(password, user.passwordHash)) {
        return user;
      }
    }
    return null;
  }
}
