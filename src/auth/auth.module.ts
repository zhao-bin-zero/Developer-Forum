import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserMoudle } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
  imports: [
    UserMoudle,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtConstants.secret'),
        // 有效期30分钟
        signOptions: { expiresIn: '1800s' },
      }),
    }),
    ConfigModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, CaslAbilityFactory],
  controllers: [AuthController],
  exports: [CaslAbilityFactory],
})
export class AuthModule {}
