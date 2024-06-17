import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "@app/common/dtos/create-user.dto";
import { LoginUserDto } from "@app/common";

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }
//create-user
    @Post('/signup')
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log("api-gatweway", createUserDto);
        this.logger.log("createUser method called with data: " + JSON.stringify(createUserDto));
        return this.natsClient
            .send({ cmd: 'create_user' }, createUserDto)
    }
    //login-user
    @Post('/login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
        console.log("api-gatweway", loginUserDto);
        this.logger.log("loginUser method called with data: " + JSON.stringify(loginUserDto));
        return this.natsClient
            .send({ cmd: 'login_user' }, loginUserDto)
    }        

}