import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { User } from './user.decorator';
import { IUserRO } from './user.interface';
import { UserService } from './user.service';

import {
  ApiBearerAuth,
  ApiUseTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('user')
  public async findMe(@User('email') email: string): Promise<IUserRO> {
    return this.userService.findByEmail(email);
  }

  @Put('user')
  public async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
    return this.userService.update(userId, userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('users')
  public async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete('users/:slug')
  public async delete(@Param() params) {
    return this.userService.delete(params.slug);
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  public async login(@Body('user') loginUserDto: LoginUserDto): Promise<IUserRO> {
    const foundUser = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!foundUser) {
      throw new HttpException({ errors }, 401);
    }
    const token = await this.userService.generateJWT(foundUser);
    const { email, username, bio, image } = foundUser;
    const user = { email, token, username, bio, image };
    return { user };
  }
}
