import { clearKubeconfigEnvVars } from "../utils/clear-kube-env-vars";

describe("clearKubeconfigEnvVars tests", () => {
  it("should not touch non kubeconfig keys", () => {
    expect(clearKubeconfigEnvVars({ a: "22" })).toStrictEqual({ a: "22" });
  });

  it("should remove a single kubeconfig key", () => {
    expect(clearKubeconfigEnvVars({ a: "22", kubeconfig: "1" })).toStrictEqual({ a: "22" });
  });

  it("should remove a two kubeconfig key", () => {
    expect(clearKubeconfigEnvVars({ a: "22", kubeconfig: "1", kUbeconfig: "1" })).toStrictEqual({ a: "22" });
  });
});
