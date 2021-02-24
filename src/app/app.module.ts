import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMoudle } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/roles.guard';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 作用于全局
      load: [config], // 加载自定义配置项
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('DATABASE_CONFIG');
        // 自动载入实体
        return { ...dbConfig, autoLoadEntities: true };
      },
      inject: [ConfigService], // 记得注入服务，不然useFactory函数中获取不到ConfigService
    }),
    UserMoudle,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
