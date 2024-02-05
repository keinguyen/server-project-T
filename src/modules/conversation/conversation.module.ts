import { Module } from "@nestjs/common";
import { ConversationController } from "./conversation.controller";
import { SocketGateway } from "src/socket/socket.gateway";

@Module({
  controllers: [ConversationController],
  providers: [SocketGateway],
})
export class ConversationModule {}
