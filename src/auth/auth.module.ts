import { AuthController } from '@/auth/auth.controller';
import { User } from '@/database/entities/User.entity';
import { AuthService } from '@/auth/auth.service';
import { UserService } from '@/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Role } from '@/database/entities/Role.entity';
import { RoleService } from '@/role/role.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Role]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION') },
      }),
    }),
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
    RoleService,
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
