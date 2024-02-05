import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DolbyModule } from "./modules/dolby/dolby.module";
import { SocketGateway } from "./socket/socket.gateway";
import { ConversationModule } from "./modules/conversation/conversation.module";

@Module({
  imports: [DolbyModule, ConversationModule],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
