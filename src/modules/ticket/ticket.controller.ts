import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
} from "@nestjs/common";
import axios from "axios";
import { Response } from "express";

const isDev = false;
const host = isDev
  ? "http://localhost:9999/"
  : "https://ephemeral-salmiakki-1ae238.netlify.app/";

@Controller("/api/ticket")
export class TicketController {
  private readonly logger = new Logger(TicketController.name);
  constructor() {}

  // end user now use these api to init dolby connection
  // @Roles([EUserRole.doctor, EUserRole.customerSupport])
  @Get("/get")
  async getTickets(@Res() res: Response) {
    try {
      const request = {
        url: `${host}.netlify/functions/tickets`,
        headers: {
          "Content-Type": "application/json",
          subject: "tickets.api.getList",
        },
      };
      const { data } = await axios.get(request.url, {
        headers: request.headers,
      });

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      const errorStr = `Error when get tickets ${error}`;

      this.logger.error(errorStr);
      return res.status(HttpStatus.FORBIDDEN).send("Error when get tickets");
    }
  }

  @Post("/create")
  async createTicket(@Body() body: {}, @Res() res: Response) {
    try {
      const request = {
        url: `${host}.netlify/functions/tickets`,
        headers: {
          "Content-Type": "application/json",
          subject: "tickets.api.createTicket",
        },
      };
      const { data } = await axios.post(request.url, body, {
        headers: request.headers,
      });

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      const errorStr = `Error when create ticket ${error}`;

      this.logger.error(errorStr);
      return res.status(HttpStatus.FORBIDDEN).send("Error when create ticket");
    }
  }
}
