import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PinService } from './pin.service';

@ApiTags('沸点')
@Controller('api/pin')
export class PinController {
  constructor(private readonly pinService: PinService) {}
}
