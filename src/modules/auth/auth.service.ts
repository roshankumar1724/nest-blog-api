import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(userName: string, userPass: string) {
    // find if user exists with this email
    const user = await this.userService.findOneByEmail(userName);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(userPass, user.password);
    if (!match) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user: UserDto) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user: UserDto) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.userService.create({
      ...user,
      password: pass
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser['dataValues'];

    // generate Token
    const token = await this.generateToken(result);

    // Return the user and the token
    return {
      user: result,
      token
    }
  }

  private async generateToken(user: UserDto) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
