import moment from "moment";

export const getCurrentDateTime = () => moment().utc().format();

export const getMillisecondsFromUnixEpoch = () => Date.now();

export const getSecondsFromUnixEpoch = () => Math.floor(getMillisecondsFromUnixEpoch() / 1000);
