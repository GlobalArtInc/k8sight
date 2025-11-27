import type { MessageChannel } from "@kubesightapp/messaging";

export interface IpcFileLogObject {
  fileId: string;
  entry: {
    level: string;
    message: string;
    internalMessage: string;
  };
}

export type IpcFileLoggerChannel = MessageChannel<IpcFileLogObject>;

export const ipcFileLoggerChannel: IpcFileLoggerChannel = {
  id: "ipc-file-logger-channel",
};

export const closeIpcFileLoggerChannel: MessageChannel<string> = {
  id: "close-ipc-file-logger-channel",
};
