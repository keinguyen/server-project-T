import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { DolbyService } from "./dolby.service";
import { DolbyController } from "./dolby.controller";

@Module({
  controllers: [DolbyController],
  providers: [DolbyService, ConfigService],
})
export class DolbyModule {}
