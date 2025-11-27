import { applicationInformationToken } from "@kubesightapp/application";
import { bundledExtensionInjectionToken } from "@kubesightapp/legacy-extensions";
import { object } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import semanticBuildVersionInjectable from "../../../../../vars/common/semantic-build-version.injectable";

const specificVersionsInjectable = getInjectable({
  id: "specific-versions",
  instantiate: (di) => {
    const buildSemanticVersion = di.inject(semanticBuildVersionInjectable);
    const bundledExtensions = di.injectMany(bundledExtensionInjectionToken);
    const applicationInformation = di.inject(applicationInformationToken);

    if (buildSemanticVersion.prerelease[0] === "latest") {
      return [];
    }

    const corePackageVersions = object
      .entries(applicationInformation.dependencies)
      .filter(([name]) => name.startsWith("@kubesightapp/"))
      .map(([name, version]) => `${name}: ${version}`);
    const bundledExtensionVersions = bundledExtensions.map((ext) => `${ext.manifest.name}: ${ext.manifest.version}`);

    return [...corePackageVersions, ...bundledExtensionVersions];
  },
});

export default specificVersionsInjectable;
