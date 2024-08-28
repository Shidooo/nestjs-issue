import { Module } from '@nestjs/common';
import { AController } from './a.controller';

@Module({
  imports: [
  ],
  controllers: [AController],
  providers: [],
})
export class AModule {}
