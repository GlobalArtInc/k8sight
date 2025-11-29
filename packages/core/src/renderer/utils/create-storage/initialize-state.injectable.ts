import { beforeApplicationIsLoadingInjectionToken } from "@kubesightapp/application";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import AwaitLock from "await-lock";
import { comparer, reaction, runInAction, toJS } from "mobx";
import directoryForK8sightLocalStorageInjectable from "../../../common/directory-for-k8sight-local-storage/directory-for-k8sight-local-storage.injectable";
import readJsonFileInjectable from "../../../common/fs/read-json-file.injectable";
import writeJsonFileInjectable from "../../../common/fs/write-json-file.injectable";
import joinPathsInjectable from "../../../common/path/join-paths.injectable";
import setupAppPathsInjectable from "../../app-paths/setup-app-paths.injectable";
import hostedClusterIdInjectable from "../../cluster-frame-context/hosted-cluster-id.injectable";
import { storageHelperLogPrefix } from "../storage-helper";
import k8sightLocalStorageStateInjectable from "./state.injectable";
import storageSaveDelayInjectable from "./storage-save-delay.injectable";

const initializeStateInjectable = getInjectable({
  id: "initialize-k8sight-local-storage-state",
  instantiate: (di) => ({
    run: async () => {
      const joinPaths = di.inject(joinPathsInjectable);
      const directoryForK8sightLocalStorage = di.inject(directoryForK8sightLocalStorageInjectable);
      const hostedClusterId = di.inject(hostedClusterIdInjectable);
      const k8sightLocalStorageState = di.inject(k8sightLocalStorageStateInjectable);
      const readJsonFile = di.inject(readJsonFileInjectable);
      const writeJsonFile = di.inject(writeJsonFileInjectable);
      const logger = di.inject(loggerInjectionToken);
      const storageSaveDelay = di.inject(storageSaveDelayInjectable);
      const lock = new AwaitLock();

      const filePath = joinPaths(directoryForK8sightLocalStorage, `${hostedClusterId || "app"}.json`);

      try {
        const localFile = await readJsonFile(filePath);

        if (typeof localFile === "object") {
          runInAction(() => {
            Object.assign(k8sightLocalStorageState, localFile);
          });
        }
      } catch {
        // do nothing
      } finally {
        logger.info(`${storageHelperLogPrefix} loading finished for ${filePath}`);
      }

      reaction(() => toJS(k8sightLocalStorageState), saveFile, {
        delay: storageSaveDelay, // lazy, avoid excessive writes to fs
        equals: comparer.structural, // save only when something really changed
      });

      async function saveFile(state: Record<string, unknown>) {
        try {
          await lock.acquireAsync();
          logger.info(`${storageHelperLogPrefix} saving ${filePath}`);
          await writeJsonFile(filePath, state);
        } catch (error) {
          logger.error(`${storageHelperLogPrefix} saving failed: ${error}`, {
            json: state,
            jsonFilePath: filePath,
          });
        } finally {
          lock.release();
        }
      }
    },
    runAfter: setupAppPathsInjectable,
  }),
  injectionToken: beforeApplicationIsLoadingInjectionToken,
});

export default initializeStateInjectable;
