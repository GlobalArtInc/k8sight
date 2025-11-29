import path from "path";
import { unionPATHs } from "./union-env-path";

describe("unionPATHs", () => {
  it("return the same path if given only one with no double delimiters", () => {
    expect(unionPATHs(`/bin/bar${path.delimiter}/usr/bin`)).toBe(`/bin/bar${path.delimiter}/usr/bin`);
  });

  it("return equivalent path if given only one with no double delimiters", () => {
    expect(unionPATHs(`/bin/bar${path.delimiter}${path.delimiter}/usr/bin`)).toBe(`/bin/bar${path.delimiter}/usr/bin`);
  });

  it("should remove duplicate entries, appending non duplicates in order received", () => {
    expect(unionPATHs(`/bin/bar${path.delimiter}/usr/bin`, `/bin/bar${path.delimiter}/usr/k8sight/bat`)).toBe(
      `/bin/bar${path.delimiter}/usr/bin${path.delimiter}/usr/k8sight/bat`,
    );
  });

  it("should remove duplicate entries, appending non duplicates in order received, 3", () => {
    expect(
      unionPATHs(
        `/bin/bar${path.delimiter}/usr/bin`,
        `/bin/bar${path.delimiter}/usr/k8sight/bat`,
        `/usr/local/k8sight${path.delimiter}/usr/bin`,
      ),
    ).toBe(`/bin/bar${path.delimiter}/usr/bin${path.delimiter}/usr/k8sight/bat${path.delimiter}/usr/local/k8sight`);
  });
});
