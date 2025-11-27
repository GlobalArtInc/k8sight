import { sendMessageToChannelInjectionToken } from "@kubesightapp/messaging";
import { MESSAGE } from "triple-beam";
import { getDiForUnitTesting } from "../../../renderer/getDiForUnitTesting";
import ipcLogTransportInjectable from "./ipc-transport.injectable";
import rendererLogFileIdInjectable from "./renderer-log-file-id.injectable";

import type { SendMessageToChannel } from "@kubesightapp/messaging";

import type { DiContainer } from "@ogre-tools/injectable";

describe("renderer log transport through ipc", () => {
  let di: DiContainer;
  let sendIpcMock: SendMessageToChannel;

  beforeEach(() => {
    sendIpcMock = jest.fn();
    di = getDiForUnitTesting();
    di.override(sendMessageToChannelInjectionToken, () => sendIpcMock);
    di.override(rendererLogFileIdInjectable, () => "some-log-id");
  });

  it("send serialized ipc messages on log", () => {
    const logTransport = di.inject(ipcLogTransportInjectable);

    logTransport.log(
      {
        level: "info",
        message: "some log text",
        [MESSAGE]: "actual winston log text",
      },
      () => {},
    );

    expect(sendIpcMock).toHaveBeenCalledWith(
      { id: "ipc-file-logger-channel" },
      {
        entry: {
          level: "info",
          message: "some log text",
          internalMessage: "actual winston log text",
        },
        fileId: "some-log-id",
      },
    );
  });
});
