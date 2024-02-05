import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

interface DolbyToken {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

@Injectable()
export class DolbyService {
  private readonly logger = new Logger(DolbyService.name);

  constructor(private nestConfig: ConfigService) {}

  private generateAuthHeader(): string {
    return `Bearer 024ebbaf175bdbd89c0cf6d2a319ef5c03560a9b57ddbcb6e8a9a6895425324c`;
  }

  async generateToken(streamName: string, label: string) {
    this.logger.debug("Begin to generate dolby token");

    const request = {
      method: "post",
      url: `https://api.millicast.com/api/publish_token/`,
      headers: {
        Authorization: this.generateAuthHeader(),
        "Content-Type": "application/json",
      },
      data: {
        subscribeRequiresAuth: false,
        record: false,
        multisource: true,
        enableThumbnails: false,
        displaySrtPassphrase: false,
        lowLatencyRtmp: true,
        streams: [
          {
            isRegex: false,
            streamName,
          },
        ],
        label,
      },
    };

    const { data } = await axios.post<DolbyToken>(request.url, request.data, {
      headers: request.headers,
    });

    console.log("****** data ******", data);

    return data;
  }
}
