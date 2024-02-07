import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { AccessToken } from "livekit-server-sdk";
import { NotificationService } from "./notification/notification.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private pushNotificationService: NotificationService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("/push-notification")
  async pushNotification() {
    await this.pushNotificationService.push();
  }
}
