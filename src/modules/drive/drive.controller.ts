import {
  Controller,
  HttpStatus,
  Logger,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express/multer";
import { Response } from "express";
import { DriveService } from "src/modules/drive/drive.service";
import axios from "axios";

@Controller("/api/drive")
export class DriveController {
  private readonly logger = new Logger(DriveController.name);
  constructor(private readonly driveService: DriveService) {}

  // end user now use these api to init dolby connection
  // @Roles([EUserRole.doctor, EUserRole.customerSupport])
  @Post("/upload/:ticketId")
  @UseInterceptors(FilesInterceptor("files"))
  async uploadFile(
    @Param("ticketId") ticketId,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Res() res: Response
  ) {
    const isDev = false;
    const host = isDev
      ? "http://localhost:9999/"
      : "https://ephemeral-salmiakki-1ae238.netlify.app/";

    try {
      const result = await this.driveService.createFile(files);
      const request = {
        url: `${host}.netlify/functions/attachments`,
        headers: {
          "Content-Type": "application/json",
          subject: "attachments.api.uploadfiles",
        },
      };
      const { data } = await axios.post(
        request.url,
        {
          ticketId,
          files: result,
        },
        {
          headers: request.headers,
        }
      );

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      const errorStr = `Error when upload file to drive ${error}`;

      this.logger.error(errorStr);
      return res
        .status(HttpStatus.FORBIDDEN)
        .send("Error when upload file to drive");
    }
  }
}
