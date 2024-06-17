import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "@app/common/dtos/create-user.dto";

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log("api-gatweway", createUserDto);
        this.logger.log("createUser method called with data: " + JSON.stringify(createUserDto));
        return this.natsClient
            .send({ cmd: 'create_user' }, createUserDto)
    }
}