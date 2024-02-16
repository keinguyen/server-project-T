import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DriveController } from "src/modules/drive/drive.controller";
import { DriveService } from "src/modules/drive/drive.service";

@Module({
  controllers: [DriveController],
  providers: [DriveService, ConfigService],
})
export class DriveModule {}
