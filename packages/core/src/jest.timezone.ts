// Setting the timezone to UTC to ensure same timezone for CI and local environments
module.exports = async () => {
  process.env.TZ = "UTC";
};

export {};
