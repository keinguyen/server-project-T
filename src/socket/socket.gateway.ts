import { Logger } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { Observable, from, map } from "rxjs";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
  transports: ["websocket"],
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  private logger = new Logger();

  constructor() {}

  @SubscribeMessage("joinConversation")
  joinConversation(
    @MessageBody() roomId: number,
    @ConnectedSocket() client: Socket
  ) {
    this.logger.debug(client);
    client.emit("joinConversation", roomId.toString());
  }

  @SubscribeMessage("endConversation")
  endConversation(
    @MessageBody() roomId: number,
    @ConnectedSocket() client: Socket
  ) {
    client.emit("endConversation", roomId.toString());
  }
}
