import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AService {

  constructor(@Inject('SVC-TRIP') private readonly tripService: ClientProxy) {}

  public async a(): Promise<any> {
    const pattern = { entity: 'b', action: 'a' };
    const offerUpdated = await firstValueFrom(
      this.tripService.send<any>(pattern, {}),
    );
    return offerUpdated;
  }

}
