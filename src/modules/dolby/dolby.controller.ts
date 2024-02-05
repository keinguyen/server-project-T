import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { DolbyService } from "./dolby.service";

@Controller("/api/dolby")
export class DolbyController {
  private readonly logger = new Logger(DolbyController.name);
  constructor(private readonly dolbyService: DolbyService) {}

  // end user now use these api to init dolby connection
  // @Roles([EUserRole.doctor, EUserRole.customerSupport])
  @Get("/token/:streamName/:label")
  async generateToken(
    @Param("streamName") streamName,
    @Param("label") label,
    @Res() res: Response
  ) {
    try {
      const dolbyTokenData = await this.dolbyService.generateToken(
        streamName,
        label
      );

      console.log("****** dolbyTokenData ******", dolbyTokenData);

      return res.status(HttpStatus.OK).json(dolbyTokenData);
    } catch (error) {
      const errorStr = `Error when generate token Dolby ${JSON.stringify(
        error
      )}`;

      this.logger.error(errorStr);
      return res.status(HttpStatus.FORBIDDEN).send("Invalid token");
    }
  }
}
