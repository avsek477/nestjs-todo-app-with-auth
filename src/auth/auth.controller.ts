import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto, @Res() res: Response) {
        await this.authService.signUp(authCredentialsDto);
        return res.status(200).json({
            statusCode: 200,
            message: "Account created successfully."
        })
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCrendentialsDto: AuthCredentialsDto, @Res() res: Response) {
        console.log(authCrendentialsDto)
        const loginToken = await this.authService.signIn(authCrendentialsDto);
        return res.status(200).json({
            statusCode: 200,
            accessToken: loginToken
        })
    }
}
