import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

const systemThemeConfigurationInjectable = getInjectable({
  id: "system-theme-configuration",
  instantiate: () => observable.box<"dark" | "light">("dark"),
});

export default systemThemeConfigurationInjectable;
