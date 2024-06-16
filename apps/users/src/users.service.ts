import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/common/dtos/create-user.dto';

@Injectable()
export class UsersMicroserviceService {
  // constructor(
  //   @InjectRepository(User)
  //   private readonly userRepository: Repository<User>,
  // ) { }
  // createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const newUser = this.userRepository.create(createUserDto);
  //   return this.userRepository.save(newUser);
  // }
}
