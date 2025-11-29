import { getInjectable } from "@ogre-tools/injectable";
import { themeDeclarationInjectionToken } from "./declaration";

const themesInjectable = getInjectable({
  id: "themes",
  instantiate: (di) => {
    const themes = di.injectMany(themeDeclarationInjectionToken);

    return new Map(themes.map((theme) => [theme.name, theme]));
  },
});

export default themesInjectable;
