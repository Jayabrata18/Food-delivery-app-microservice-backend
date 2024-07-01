import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '@app/common/dtos/users/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/common/entity/users/create-users.entity';
import { LoginUserDto } from '@app/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '@app/common/dtos/users/update-user.dto';
@Injectable()
export class UsersMicroserviceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  //signup
  createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }
  //login
  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;
    // Find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password not match');
    }
    return user;
  }
  //get all users
  async getAllUsers(): Promise<{ users: User[], count: number }> {
    const [users, count] = await this.userRepository.findAndCount();
    return { users, count };
  }
  //get user by id
  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  //delete user by id
  async deleteUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete({ userId: userId });
    return user;
  }
  //update user by id
  async updateUserById(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update({ userId: userId }, updateUserDto);
    return await this.userRepository.findOne({ where: { userId: userId } });
  }
}
