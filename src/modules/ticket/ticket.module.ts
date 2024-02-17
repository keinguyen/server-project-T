import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TicketController } from "src/modules/ticket/ticket.controller";
import { TicketService } from "src/modules/ticket/ticket.service";

@Module({
  controllers: [TicketController],
  providers: [TicketService, ConfigService],
})
export class TicketModule {}
