import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DolbyModule } from "./modules/dolby/dolby.module";
import { DriveModule } from "./modules/drive/drive.module";
import { SocketGateway } from "./socket/socket.gateway";
import { ConversationModule } from "./modules/conversation/conversation.module";
import { NotificationService } from "./notification/notification.service";
import { TicketModule } from "src/modules/ticket/ticket.module";

@Module({
  imports: [DolbyModule, DriveModule, TicketModule, ConversationModule],
  controllers: [AppController],
  providers: [AppService, SocketGateway, NotificationService],
})
export class AppModule {}
