import { Test, TestingModule } from "@nestjs/testing";
import { SocketGateway } from "./socket.gateway";
import { reduce } from "rxjs";

describe("DolbyGateway", () => {
  let gateway: SocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketGateway],
    }).compile();

    gateway = module.get<SocketGateway>(SocketGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  describe("identity", () => {
    it("should return the same number has what was sent", async () => {
      await expect(true).toBeTruthy();
    });
  });
});
