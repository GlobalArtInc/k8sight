/**
 * Data for telemetry
 */
export interface AppEvent {
  name: string;
  action: string;
  destination?: string;
  params?: Record<string, any>;
}
