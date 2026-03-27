import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtPayload } from './strategies/jwt.strategy';

export interface AuthResult {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await this.userService.validatePassword(
      user,
      password,
    );

     if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(user: User): Promise<AuthResult> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
    };
  }

}
