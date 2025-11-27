export interface HelmRepo {
  name: string;
  url: string;
  cacheFilePath: string;
  caFile?: string;
  certFile?: string;
  insecureSkipTlsVerify?: boolean;
  keyFile?: string;
  username?: string;
  password?: string;
}
