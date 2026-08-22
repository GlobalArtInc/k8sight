const { execFileSync } = require("node:child_process");
const { existsSync } = require("node:fs");
const { join } = require("node:path");

/**
 * Apple Silicon refuses to execute code that carries no signature at all, and these builds are only
 * signed when the Apple secrets happen to be configured. electron-builder then ships a bundle whose
 * inherited Electron signature its own edits have invalidated, and macOS reports that to the user as
 * "K8Sight is damaged and can't be opened" -- a dead end, with no way to override it.
 *
 * An ad-hoc signature needs no Apple account and turns that into the ordinary unverified-developer
 * prompt, which the user can accept from System Settings. Removing the prompt is what notarization
 * is for, and that still needs a paid Developer ID.
 */
exports.default = async function adhocSign({ electronPlatformName, appOutDir, packager }) {
  if (electronPlatformName !== "darwin") {
    return;
  }

  // With a real identity electron-builder signs properly moments after this hook, so leave it to it.
  if (process.env.CSC_LINK || process.env.CSC_NAME) {
    return;
  }

  const appPath = join(appOutDir, `${packager.appInfo.productFilename}.app`);
  const sign = (target, ...flags) =>
    execFileSync("codesign", ["--force", "--sign", "-", ...flags, target], { stdio: "inherit" });

  /**
   * The bundled command line tools are plain executables under Resources rather than nested bundles,
   * so `--deep` only hashes them into the app's seal and never signs them. They are spawned as their
   * own processes, which is exactly what the kernel checks, so each one needs its own signature.
   * Sign them before the bundle: signing anything inside the app afterwards would break that seal.
   */
  for (const arch of ["x64", "arm64", "universal"]) {
    for (const tool of ["kubectl", "helm", "k8sight-k8s-proxy"]) {
      const toolPath = join(appPath, "Contents", "Resources", arch, tool);

      if (existsSync(toolPath)) {
        sign(toolPath);
      }
    }
  }

  sign(appPath, "--deep");
};
