import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRespository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRespository)
        private userRepository: UserRespository,
        private jwtService: JwtService
    ) {}

    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const email = await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!email) {
            throw new UnauthorizedException("Invalid credentials");
        }
        const payload: JwtPayload = { email };
        const accessToken = await this.jwtService.sign(payload);

        return accessToken;
    }
}
