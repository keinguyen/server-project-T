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

  constructor() {}

  @SubscribeMessage("joinConversation")
  joinConversation(
    @MessageBody() roomId: number,
    @ConnectedSocket() client: Socket
  ) {
    client.emit("joinConversation", roomId.toString());
  }
}
