import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Response } from "express";
import { Server, Socket } from "socket.io";
import { SocketGateway } from "src/socket/socket.gateway";
@WebSocketGateway({
  cors: {
    origin: "*",
  },
  transports: ["websocket"],
})
@Controller("/api/conversation")
export class ConversationController {
  constructor(private dolbyGateway: SocketGateway) {}

  @Post("/create")
  async createConversation(
    @Body() body: { streamName: string; accountId: string },
    @Res() res: Response
  ) {
    const { streamName, accountId } = body;

    this.dolbyGateway.server.emit("joinConversation", {
      streamName: streamName,
      accountId: accountId,
    });

    return res.status(HttpStatus.OK).json("");
  }
}
