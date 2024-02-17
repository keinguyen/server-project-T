import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { title } from "process";
import { Readable } from "stream";

@Injectable()
export class DriveService {
  private oauth2Client;
  private drive: ReturnType<typeof google.drive>;
  private folderId = "1y-_5bxfabZVe0RVaN919IYB1Vq6tF-ii";
  private mimeType = "application/vnd.google-apps.folder";

  constructor() {
    this.oauth2Client = new google.auth.GoogleAuth({
      credentials: {
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDsB695dTIEf0bx\ndKOhnymiljEHJrMf83i0ZhgCJiy++MIbmpvWHXNvOBW3Bv318FIy83VWeO0j4LPD\nk7xgFOxc6Nk+T6b9PPbIWUMm9UDOy7MuhnYq6VbO75xF/2tjzM7MYWYB9Hm0d5zk\nWxJ7Bvxx6eO0GgkAZ+kQaqxyitpLIzaVES2qx0XPf0B1xNG0/ZQvyg/5CM3JeswT\nZ+UlCFhiQuVS1CyyNw0KVRa6AOK1ioHt5rpLdMXRDTyBzh9/8BRI6NoCPOUJfFwK\nke/EozlLN1I1WD0Pjs2V35JwCgMzIR11sZMTAvCZkCHtM+pQNXY09OZPNKMJ18fu\nZsdt+IuxAgMBAAECggEAAjQY1MhIemyabnL5e270y2JIkeRaxBUYpDfXHd9aXUFi\n79wJJr4T+k6qkTtc+pikQ8/XDBgelU5Uj00H81kD/eK58yV44yCtvcrA4D0Q6P1T\ng78t8jzxxQZ3+IVSbNZC0KX7dvrfz1SrNSHj3HHWayp/qDTyruYexxBKjNqJVYM5\njmY+O0jwhRvd7pr5CtvzPeU0lYcLxzpcwirzEjVFCvNr7yyXiT7mDxqAjBOIuxPj\nEkk9yycSe8SYhNEqBiZJB9EyX5fXGxetgHUJf8N+jRYr5YC4o7COF+5b5b+OvUX7\nB6HwkZl9sdeNDMg2zUKhYTYCxM3orpqqrgjPSTrPmQKBgQD3WJwpv5gnOsfwkirm\nI2/G1cExYGNnpOG+r3zy1vflAN4rsmCFek9H0XuvYiUovovy6QJ5aJx2ecRsQYqA\nnLt876nQ2RWNTr7j92gGEH4VBfILwCGJOuThSbr6LdVl9FFiR/ZF5Dlpfk4GAJF6\n2tiNWxE+sK6tteLBLtRqTzEsxQKBgQD0SbiarPpXZTQfOaAQmUw1UphTGNXyVjDf\na/1lcUcWm/yEqEBPNcVVObrvkvXRjvgUoVFJcC+P6dX6aGzUzS3SO4Nvwp9YLQ7P\nrR+/8hK9PKtx+ESFNvrEjcjBN+dITuXrdUsVB25mQtXI8FwJch0czQixY80YMLvu\n9DoDkCDp/QKBgDFDj87s3yQpG/t5UVwHANNMba8k8IeLGn89OpivYi5VTurLG1ha\ndQHr4kObO6Vy1jLqX9jIkikytYGOSES3csw+e8ciBZ3gajrDYw+aJ1KOnZfji4pm\nlYGdisUbbd5hm/gENzPScfDl/CpL4K3keq8kzTl8PT5R9LjfV+VYooW1AoGAWDUG\nY1NyUXxJhbzY/yVbTyWzus2M8yQMIaBsruRoNtG8LGpUTkWsK0ndJgR6nmBxU4Gs\nSEgp5F0a1oA+S9iKYw76NrCfuMcMQhDRFg3illIB1fU/SJrBkZdgleQJryJOAucn\nZUB5rJMVfqjLkt2RhYTDTsoqlEGEmpO1HvQ77kECgYEA9uyDDfiRrd9aPz9ZGgPd\nzIqpKz9b9K1epqjRx2JRgbf0OVKwuHYEq21SK1nj0hB5KTzhC7BdM8SOSkZLi1qj\n6wdvE7BLKu8sChg6hi+XEGD41t+3K1Mz+ff0rNKp+kc3sx0dd+hVwwZtu5oXcszf\nw80BSuvDA3WYLmZstRABG8E=\n-----END PRIVATE KEY-----\n",
        client_email: "project-t@project-t-414303.iam.gserviceaccount.com",
        client_id: "107493961320498209508",
      },
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    this.drive = google.drive({
      version: "v3",
      auth: this.oauth2Client,
    });
  }

  createFolder = async (title: string) => {
    try {
      const result = await this.drive.files.create({
        requestBody: {
          name: title,
          mimeType: this.mimeType,
          parents: [this.folderId],
        },
        fields: "id",
      });

      return result.data.id;
    } catch (error) {
      return undefined;
    }
  };

  createFile = async (
    folderId: string,
    files: Array<Express.Multer.File>
  ): Promise<{ fileId: string; thumbnailLink: string }[]> => {
    const data: { fileId: string; thumbnailLink: string }[] = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const result = await this.drive.files.create({
        requestBody: {
          name: file.filename,
          parents: [folderId],
        },
        media: {
          mimeType: "image/jpeg",
          body: Readable.from(Buffer.from(new Uint8Array(file.buffer))),
        },
        fields: "id, thumbnailLink",
      });

      if (!result.data) {
        throw new Error("UPLOAD FILE ERROR");
      }

      const { id: fileId, thumbnailLink } = result.data;
      data.push({ fileId, thumbnailLink });
    }
    return data;
  };
}
