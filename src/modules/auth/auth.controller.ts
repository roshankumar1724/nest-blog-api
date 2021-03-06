import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DoesUserExistGuard } from 'src/core/guards/does-user-exist.guard';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(DoesUserExistGuard)
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
