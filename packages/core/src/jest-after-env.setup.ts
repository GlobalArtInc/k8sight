import "@testing-library/jest-dom";

// Note: This is a kludge to prevent "Hooks cannot be defined inside tests" error
// when importing a test util inside a test suite.
import { render } from "@testing-library/react";

void render;
