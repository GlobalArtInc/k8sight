import { getInjectable } from "@ogre-tools/injectable";
import { lensThemeDeclarationInjectionToken } from "./declaration";

const defaultLensThemeInjectable = getInjectable({
  id: "default-lens-theme",
  instantiate: (di) => {
    const themes = di.injectMany(lensThemeDeclarationInjectionToken);
    const [defaultTheme, ...rest] = themes.filter((theme) => theme.isDefault);

    if (rest.length > 0) {
      throw new Error("Multiple K8Sight Theme's are declared as the default");
    }

    if (!defaultTheme) {
      throw new Error("No K8Sight Theme is declared as the default");
    }

    return defaultTheme;
  },
});

export default defaultLensThemeInjectable;
