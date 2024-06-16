import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "@app/common/dtos/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log("api-gatweway", createUserDto);
        return this.natsClient
            .send({ cmd: 'create_user' }, createUserDto)
    }
}