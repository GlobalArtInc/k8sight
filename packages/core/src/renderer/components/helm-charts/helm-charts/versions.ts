/**
 * A type for the possible versions that a helm release was made from
 */
export interface HelmChartVersion {
  repo: string;
  version: string;
}
