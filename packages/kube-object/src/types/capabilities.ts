/**
 * Adds and removes POSIX capabilities from running containers.
 */
export interface Capabilities {
  /**
   * Added capabilities
   */
  add?: string[];

  /**
   * Removed capabilities
   */
  drop?: string[];
}
