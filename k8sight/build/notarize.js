exports.default = async function notarizing(context) {
  const { notarize } = await import('@electron/notarize');
  const { electronPlatformName, appOutDir } = context;

  if (electronPlatformName !== "darwin") {
    return;
  }

  if (!process.env.APPLEID || !process.env.APPLEIDPASS) {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    appBundleId: process.env.APPBUNDLEID || "io.k8sight.k8sightapp",
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
    ascProvider: process.env.ASCPROVIDER,
    teamId: process.env.APPLETEAMID,
    tool: process.env.NOTARIZE_TOOL || "notarytool",
  });
};
