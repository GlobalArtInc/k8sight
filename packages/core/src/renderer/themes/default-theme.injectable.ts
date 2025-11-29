import { getInjectable } from "@ogre-tools/injectable";
import { themeDeclarationInjectionToken } from "./declaration";

const defaultThemeInjectable = getInjectable({
  id: "default-theme",
  instantiate: (di) => {
    const themes = di.injectMany(themeDeclarationInjectionToken);
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

export default defaultThemeInjectable;
