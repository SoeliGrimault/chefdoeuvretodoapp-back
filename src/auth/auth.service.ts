import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const { email, password, name, role } = createAuthDto;

    //je HacheMenu le mot de passe
    //je met le sel
    const salt = await bcrypt.genSalt();
    //je declare ma const de password hachéMenu
    const hachedPassword = await bcrypt.hash(password, salt);

    // je creer mon entité pour mon user
    const user = this.userRepository.create({
      email,
      password: hachedPassword,
      name,
      role,
    });

    try {
      //enregistrement de l'entité du user crée
      const createdUser = await this.userRepository.save(user);
      delete createdUser.password;
      return createdUser;
      // maintenant dans le catch gestion des erreurs si le mail existe deja
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('cette email existe deja dans la BDD');
      } else {
        console.log('error c quoi ce bordel', error);
        throw new InternalServerErrorException();
      }
    }
  }
  // ajout de la methode pour le login
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, SORRY...',
      );
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
