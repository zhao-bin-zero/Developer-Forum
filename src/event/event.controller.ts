import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';

@ApiTags('活动')
@Controller('api/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
}
