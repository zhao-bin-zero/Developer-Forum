import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pin } from 'src/entity/pin.entity';
import { User } from 'src/entity/user.entity';
import { PinController } from './pin.controller';
import { PinService } from './pin.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pin])],
  controllers: [PinController],
  providers: [PinService],
})
export class PinModule {}
