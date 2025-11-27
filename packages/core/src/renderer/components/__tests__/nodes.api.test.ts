import { formatNodeTaint } from "@kubesightapp/kube-object";

describe("formatNodeTaint tests", () => {
  it("should use value if defined", () => {
    expect(
      formatNodeTaint({
        effect: "Foo",
        key: "hello",
        timeAdded: "pre",
        value: "a",
      }),
    ).toBe("hello=a:Foo");
  });

  it("should not use value if not defined", () => {
    expect(
      formatNodeTaint({
        effect: "Foo",
        key: "hello",
        timeAdded: "pre",
      }),
    ).toBe("hello:Foo");
  });
});
