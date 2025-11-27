import { getInjectable } from "@ogre-tools/injectable";
import { editor } from "monaco-editor";

import type { MonacoThemeData } from "../components/monaco-editor";

const addNewMonacoThemeInjectable = getInjectable({
  id: "add-new-monaco-theme",
  instantiate: () => (data: MonacoThemeData) => editor.defineTheme(data.name, data),
  causesSideEffects: true,
});

export default addNewMonacoThemeInjectable;
