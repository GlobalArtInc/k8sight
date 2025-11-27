import { getInjectable } from "@ogre-tools/injectable";
import { SemVer } from "semver";
import { buildVersionInitializable } from "../build-version/common/token";

const semanticBuildVersionInjectable = getInjectable({
  id: "semantic-build-version",
  instantiate: (di) => new SemVer(di.inject(buildVersionInitializable.stateToken)),
});

export default semanticBuildVersionInjectable;
