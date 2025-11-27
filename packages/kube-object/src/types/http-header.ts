/**
 * A custom header to be used in HTTP probes and get actions
 */
export interface HttpHeader {
  /**
   * Field name
   */
  name: string;

  /**
   * The value of the field
   */
  value: string;
}
