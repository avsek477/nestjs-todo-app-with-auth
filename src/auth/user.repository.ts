import * as bcrypt from "bcrypt";
import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRespository extends Repository<User>{
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { name, email, password } = authCredentialsDto;
        const user = new User();
        user.name = name;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try{
            await user.save();
        } catch(err) {
            if (err.code === '23505') {
                throw new ConflictException("Email already exists");
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { email, password } = authCredentialsDto;
        console.log(email, password)
        const user = await this.findOne({ email });
        console.log("USER", user)
        if(user && await user.validatePassword(password)) {
            return user.email;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}